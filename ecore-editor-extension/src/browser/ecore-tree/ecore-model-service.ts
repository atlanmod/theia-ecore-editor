/*!
 * Copyright (c) 2019-2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 */
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { JsonSchema7, UISchemaElement } from '@jsonforms/core';
import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';

import { EcoreModel } from './ecore-model';
import {
    epackageView,
    eclassView,
    ereferenceView,
    eenumView,
    eenumliteralView,
    eattributeView,
    ecoreSchema
} from './ecore-schemas';
import { Resolver } from './resolver';
import { SmModel } from '../statemachines/sm-model';
import { customSystemView, finalStateView, pseudoStateView, regionView, smSchema, stateMachineView, stateView, transitionView } from '../statemachines/sm-schema';

@injectable()
export class EcoreModelService implements TreeEditor.ModelService {
    constructor(@inject(ILogger) private readonly logger: ILogger,
                @inject(Resolver) private readonly resolver : Resolver) {}

    getDataForNode(node: TreeEditor.Node): void {
        const obj = node.jsonforms.data;
        for(const k in obj) {
            if(typeof obj[k] === 'object') {
                if ('$ref' in obj[k]) {
                    const ref = obj[k]['$ref'];
                    const resolvedObject = this.resolver.resolve(ref);
                    if(resolvedObject === undefined) {
                        console.log('Undefined ref ' + ref)
                    } else {
                        obj[k] = resolvedObject;
                    }
                }
            }
        }
        return node.jsonforms.data;
    }

    getSchemaForNode(node: TreeEditor.Node): JsonSchema7 {
        /*
         * We need to merge all the supported schemas into a single schema with all the definitions.
         */
        const def : JsonSchema7 = {'definitions': {}}
        def.definitions = {...def.definitions, ...ecoreSchema.definitions, ...smSchema.definitions};
        return {
            definitions: def.definitions,
            ...this.getSubSchemaForNode(node)
        };
    }

    private getSubSchemaForNode(node: TreeEditor.Node): JsonSchema7 | undefined {
        const schema = this.getSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return ecoreSchema.definitions?.workflow;
        }
        return undefined;
    }

    private getSchemaForType(type: string): JsonSchema7 | undefined {
        if (!type) {
            return undefined;
        }
        const t = []
        if(ecoreSchema.definitions) {
            t.push(Object.entries(ecoreSchema.definitions))
        }
        if(smSchema.definitions) {
            t.push(Object.entries(smSchema.definitions))
        }
        const schema = t
            .flatMap(entry => entry.map(def => def[1]))
            .find((definition: JsonSchema7) => definition.properties && definition.properties.eClass.const === type)
        if (!schema) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    }

    getUiSchemaForNode(node: TreeEditor.Node): UISchemaElement | undefined {
        const schema = this.getUiSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        return undefined;
    }

    private getUiSchemaForType(type: string): UISchemaElement | undefined {
        if (!type) {
            return undefined;
        }
        switch (type) {
            case EcoreModel.Type.EPackage:
                return epackageView;
            case EcoreModel.Type.EClass:
                return eclassView;
            case EcoreModel.Type.EReference:
                return ereferenceView;
            case EcoreModel.Type.EAttribute:
                return eattributeView;
            case EcoreModel.Type.EEnum:
                return eenumView;
            case EcoreModel.Type.EEnumLiteral:
                return eenumliteralView;
            case SmModel.Type.CustomSystem:
                return customSystemView;
            case SmModel.Type.StateMachine:
                return stateMachineView;
            case SmModel.Type.Region:
                return regionView;
            case SmModel.Type.PseudoState:
                return pseudoStateView;
            case SmModel.Type.State:
                return stateView;
            case SmModel.Type.FinalState:
                return finalStateView;
            case SmModel.Type.Transition:
                return transitionView;
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }

    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
        return new Map([...Array.from(EcoreModel.childrenMapping.entries()),
            ...Array.from(SmModel.childrenMapping.entries())]);
    }

    getNameForType(eClass: string): string {
        const result = EcoreModel.Type.name(eClass);
        if(result) {
            return result;
        } else {
            return SmModel.Type.name(eClass);
        }
    }
}
