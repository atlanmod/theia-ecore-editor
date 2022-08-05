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

import { CoffeeModel } from './coffee-model';
import {
    epackageView,
    eclassView,
    ereferenceView,
    eenumView,
    eenumliteralView,
    eattributeView,
    automaticTaskView,
    brewingView,
    coffeeSchema,
    controlUnitView,
    decisionView,
    dipTrayView,
    flowView,
    machineView,
    manualTaskView,
    mergeView,
    waterTankView,
    weightedFlowView,
    workflowView
} from './coffee-schemas';
import { Resolver } from './resolver';

@injectable()
export class CoffeeModelService implements TreeEditor.ModelService {
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
        return {
            definitions: coffeeSchema.definitions,
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
            return coffeeSchema.definitions?.workflow;
        }
        return undefined;
    }

    private getSchemaForType(type: string): JsonSchema7 | undefined {
        if (!type) {
            return undefined;
        }
        const schema = (coffeeSchema.definitions ? Object.entries(coffeeSchema.definitions) : [])
            .map(entry => entry[1])
            .find((definition: JsonSchema7) => definition.properties && definition.properties.eClass.const === type);
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
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return workflowView;
        }
        return undefined;
    }

    private getUiSchemaForType(type: string): UISchemaElement | undefined {
        if (!type) {
            return undefined;
        }
        switch (type) {
            case CoffeeModel.Type.EPackage:
                return epackageView;
            case CoffeeModel.Type.EClass:
                return eclassView;
            case CoffeeModel.Type.EReference:
                return ereferenceView;
            case CoffeeModel.Type.EAttribute:
                return eattributeView;
            case CoffeeModel.Type.EEnum:
                return eenumView;
            case CoffeeModel.Type.EEnumLiteral:
                return eenumliteralView;
            case CoffeeModel.Type.Machine:
                return machineView;
            case CoffeeModel.Type.ControlUnit:
                return controlUnitView;
            case CoffeeModel.Type.BrewingUnit:
                return brewingView;
            case CoffeeModel.Type.AutomaticTask:
                return automaticTaskView;
            case CoffeeModel.Type.ManualTask:
                return manualTaskView;
            case CoffeeModel.Type.DipTray:
                return dipTrayView;
            case CoffeeModel.Type.WaterTank:
                return waterTankView;
            case CoffeeModel.Type.Flow:
                return flowView;
            case CoffeeModel.Type.WeightedFlow:
                return weightedFlowView;
            case CoffeeModel.Type.Decision:
                return decisionView;
            case CoffeeModel.Type.Merge:
                return mergeView;
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    }

    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
        return CoffeeModel.childrenMapping;
    }

    getNameForType(eClass: string): string {
        return CoffeeModel.Type.name(eClass);
    }
}
