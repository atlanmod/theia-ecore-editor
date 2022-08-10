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
import { codicon, LabelProviderContribution } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { injectable } from 'inversify';

import { EcoreModel } from './ecore-model';
import { CoffeeTreeEditorConstants } from './ecore-tree-editor-widget';

const DEFAULT_COLOR = 'black';

const ICON_CLASSES: Map<string, string> = new Map([
    [EcoreModel.Type.EPackage, 'package ' + DEFAULT_COLOR],
    [EcoreModel.Type.EClass, 'symbol-class ' + DEFAULT_COLOR],
    [EcoreModel.Type.EReference, 'remote ' + DEFAULT_COLOR],
    [EcoreModel.Type.EAttribute, 'symbol-field ' + DEFAULT_COLOR],
    [EcoreModel.Type.EEnum, 'symbol-enum ' + DEFAULT_COLOR],
    [EcoreModel.Type.EEnumLiteral, 'symbol-enum-member ' + DEFAULT_COLOR],
    [EcoreModel.Type.AutomaticTask, 'gear ' + DEFAULT_COLOR],
    [EcoreModel.Type.BrewingUnit, 'flame ' + DEFAULT_COLOR],
    [EcoreModel.Type.ControlUnit, 'server ' + DEFAULT_COLOR],
    [EcoreModel.Type.Decision, 'chevron-up ' + DEFAULT_COLOR],
    [EcoreModel.Type.Dimension, 'move ' + DEFAULT_COLOR],
    [EcoreModel.Type.DipTray, 'inbox ' + DEFAULT_COLOR],
    [EcoreModel.Type.Display, 'tv ' + DEFAULT_COLOR],
    [EcoreModel.Type.Flow, 'arrow-swap ' + DEFAULT_COLOR],
    [EcoreModel.Type.Fork, 'source-control rotate-90 ' + DEFAULT_COLOR],
    [EcoreModel.Type.Join, 'source-control rotate-270 ' + DEFAULT_COLOR],
    [EcoreModel.Type.Machine, 'settings-gear ' + DEFAULT_COLOR],
    [EcoreModel.Type.ManualTask, 'symbol-property ' + DEFAULT_COLOR],
    [EcoreModel.Type.Merge, 'chevron-down ' + DEFAULT_COLOR],
    [EcoreModel.Type.Node, 'circle ' + DEFAULT_COLOR],
    [EcoreModel.Type.Processor, 'circuit-board ' + DEFAULT_COLOR],
    [EcoreModel.Type.RAM, 'memory ' + DEFAULT_COLOR],
    [EcoreModel.Type.Task, 'checklist ' + DEFAULT_COLOR],
    [EcoreModel.Type.WaterTank, 'beaker ' + DEFAULT_COLOR],
    [EcoreModel.Type.WeightedFlow, 'arrow-swap light-orange'],
    [EcoreModel.Type.Workflow, 'combine ' + DEFAULT_COLOR]
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'circle-slash ' + DEFAULT_COLOR;

@injectable()
export class EcoreTreeLabelProvider implements LabelProviderContribution {
    public canHandle(element: object): number {
        if (
            (TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element)) &&
            element.editorId === CoffeeTreeEditorConstants.EDITOR_ID
        ) {
            return 1000;
        }
        return 0;
    }

    public getIcon(element: object): string | undefined {
        let iconClass: string | undefined;
        if (TreeEditor.CommandIconInfo.is(element)) {
            iconClass = ICON_CLASSES.get(element.type);
        } else if (TreeEditor.Node.is(element)) {
            iconClass = ICON_CLASSES.get(element.jsonforms.type);
            if (!iconClass && element.jsonforms.property === 'flows') {
                iconClass = ICON_CLASSES.get(EcoreModel.Type.Flow);
            }
        }
        return iconClass ? codicon(iconClass) : codicon(UNKNOWN_ICON);
    }

    public getName(element: object): string | undefined {
        const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.eClass) {
            switch (data.eClass) {
                case EcoreModel.Type.EPackage:
                case EcoreModel.Type.EClass:
                case EcoreModel.Type.EReference:
                case EcoreModel.Type.EAttribute:
                case EcoreModel.Type.EEnum:
                case EcoreModel.Type.EEnumLiteral:
                case EcoreModel.Type.Task:
                case EcoreModel.Type.AutomaticTask:
                case EcoreModel.Type.ManualTask:
                case EcoreModel.Type.Machine:
                    return data.name || this.getTypeName(data.eClass);
                default:
                    // TODO query title of schema
                    return this.getTypeName(data.eClass);
            }
        }
        // guess
        if (data.nodes) {
            return data.name || 'Workflow';
        }
        // ugly guess, fix in modelserver
        if (data.source && data.target) {
            return 'Flow';
        }
        return undefined;
    }
    private getTypeName(eClass: string): string {
        const fragment = new URI(eClass).fragment;
        if (fragment.startsWith('//')) {
            return fragment.substring(2);
        }
        return fragment;
    }
}
