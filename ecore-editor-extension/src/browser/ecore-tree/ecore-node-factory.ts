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
import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';

import { EcoreModel } from './ecore-model';
import { EcoreTreeEditorConstants } from './ecore-tree-editor-widget';
import { EcoreTreeLabelProvider } from './ecore-tree-label-provider-contribution';
import EEnumLiteral = EcoreModel.Type.EEnumLiteral;
import { SmModel } from '../statemachines/sm-model';
import StateMachine = SmModel.Type.StateMachine;
import Region = SmModel.Type.Region;

@injectable()
export class EcoreTreeNodeFactory implements TreeEditor.NodeFactory {
    constructor(
        @inject(EcoreTreeLabelProvider) private readonly labelProvider: EcoreTreeLabelProvider,
        @inject(ILogger) private readonly logger: ILogger
    ) {}

    mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[] {
        const node = this.mapData(treeData.data);
        if (node) {
            return [node];
        }
        return [];
    }

    mapData(data: any, parent?: TreeEditor.Node, property?: string, indexOrKey?: number | string, defaultType?: string): TreeEditor.Node {
        if (!data) {
            // sanity check
            this.logger.warn('mapData called without data');
            return {
                ...this.defaultNode(),
                editorId: EcoreTreeEditorConstants.EDITOR_ID
            };
        }
        const node: TreeEditor.Node = {
            ...this.defaultNode(),
            editorId: EcoreTreeEditorConstants.EDITOR_ID,
            name: this.labelProvider.getName(data) ?? '',
            parent: parent,
            jsonforms: {
                type: this.getType(data.eClass || defaultType, data) ?? '',
                data: data,
                property: property ?? '',
                index: typeof indexOrKey === 'number' ? indexOrKey.toFixed(0) : indexOrKey
            }
        };
        // containments
        if (parent) {
            parent.children.push(node);
            parent.expanded = true;
        }
        if (data.children) {
            // component types
            data.children.forEach((element: any, idx: number) => {
                this.mapData(element, node, 'children', idx);
            });
        }
        if(data.eClassifiers) {
            // ECore type
            data.eClassifiers.forEach((element: any, idx: number) => {
                this.mapData(element, node, 'eClassifiers', idx);
            });
        }
        if(data.eStructuralFeatures) {
            // ECore type
            data.eStructuralFeatures.forEach((element: any, idx: number) => {
                this.mapData(element, node, 'eStructuralFeatures', idx);
            });
        }
        if(data.eLiterals) {
            data.eLiterals.forEach((element: any, idx: number) => {
                /*
                 * Hotfix: ModelServer does not return eClass for EEnumLiterals.
                 */
                element.eClass = EEnumLiteral;
                this.mapData(element, node, 'eLiterals', idx);
            });
        }
        if(data.statemachine) {
            /*
             * Hotfix: ModelServer does not return eClass for StateMachine.
             */
            data.eClass = StateMachine;
            this.mapData(data.statemachine, node, 'stateMachine');
        }
        if(data.regions) {
            data.regions.forEach((element: any, idx: number) => {
                element.eClass = Region;
                this.mapData(element, node, 'regions', idx);
            });
        }
        if(data.eClass === SmModel.Type.Region && data.vertice) {
            data.vertice.forEach((element: any, idx: number) => {
                this.mapData(element, node, 'vertice', idx);
            });
        }
        if(data.eClass === SmModel.Type.Region && data.transitions) {
            data.transitions.forEach((element: any, idx: number) => {
                element.eClass = SmModel.Type.Transition;
                this.mapData(element, node, 'transitions', idx);
            });
        }
        return node;
    }

    hasCreatableChildren(node: TreeEditor.Node): boolean {
        if(node) {
            const ecoreResult = EcoreModel.childrenMapping.get(node.jsonforms.type);
            if(ecoreResult) {
                return ecoreResult !== undefined;
            } else {
                const smResult = SmModel.childrenMapping.get(node.jsonforms.type);
                return smResult !== undefined;
            }
        } else {
            return false;
        }
    }

    protected defaultNode(): Pick<
        TreeEditor.Node,
        | 'children'
        | 'name'
        | 'jsonforms'
        | 'id'
        | 'icon'
        | 'description'
        | 'visible'
        | 'parent'
        | 'previousSibling'
        | 'nextSibling'
        | 'expanded'
        | 'selected'
        | 'focus'
        | 'decorationData'
    > {
        return {
            id: v4(),
            expanded: false,
            selected: false,
            parent: undefined,
            children: [],
            decorationData: {},
            name: '',
            jsonforms: { type: '', property: '', data: '' }
        };
    }

    protected getType(type: string, data: any): string | undefined {
        // TODO: eClass should always be sent from server
        if (type) {
            // given eClass
            return type;
        }
        if (data.eClass) {
            // eClass of node
            return data.eClass;
        }
        if(data["@id"].includes("statemachine")) {
            return SmModel.Type.StateMachine;
        }
        if(data["@id"].includes("region")) {
            return SmModel.Type.Region;
        }
        return undefined;
    }
}
