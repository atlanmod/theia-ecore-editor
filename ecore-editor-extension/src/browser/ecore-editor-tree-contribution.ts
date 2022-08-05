/*!
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 */
import {
    BaseTreeEditorContribution,
    BaseTreeEditorWidget,
    TreeContextMenu,
    TreeEditor
} from '@eclipse-emfcloud/theia-tree-editor';
import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { ApplicationShell, NavigatableWidgetOptions, OpenerService, WidgetOpenerOptions } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable } from 'inversify';

import { EcoreModelService } from './coffee-tree/ecore-model-service';
import { EcoreTreeCommands, OpenWorkflowDiagramCommandHandler } from './coffee-tree/ecore-tree-container';
import { CoffeeTreeEditorConstants } from './coffee-tree/ecore-tree-editor-widget';
import { EcoreTreeLabelProvider } from './coffee-tree/ecore-tree-label-provider-contribution';

@injectable()
export class EcoreTreeEditorContribution extends BaseTreeEditorContribution {
    @inject(ApplicationShell) protected shell: ApplicationShell;
    @inject(OpenerService) protected opener: OpenerService;

    constructor(
        @inject(EcoreModelService) modelService: TreeEditor.ModelService,
        @inject(EcoreTreeLabelProvider) labelProvider: EcoreTreeLabelProvider
    ) {
        super(CoffeeTreeEditorConstants.EDITOR_ID, modelService, labelProvider);
    }

    readonly id = CoffeeTreeEditorConstants.WIDGET_ID;
    readonly label = BaseTreeEditorWidget.WIDGET_LABEL;

    canHandle(uri: URI): number {
        if (
            ['.coffee', '.ecore'].includes(uri.path.ext)
        ) {
            return 1000;
        }
        return 0;
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(
            EcoreTreeCommands.OPEN_WORKFLOW_DIAGRAM,
            new OpenWorkflowDiagramCommandHandler(this.shell, this.opener));

        super.registerCommands(commands);
    }

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(TreeContextMenu.CONTEXT_MENU, {
            commandId: EcoreTreeCommands.OPEN_WORKFLOW_DIAGRAM.id,
            label: EcoreTreeCommands.OPEN_WORKFLOW_DIAGRAM.label
        });

        super.registerMenus(menus);
    }

    protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions {
        return {
            kind: 'navigatable',
            uri: this.serializeUri(uri)
        };
    }

    protected serializeUri(uri: URI): string {
        return uri.withoutFragment().toString();
    }

}
