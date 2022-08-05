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
import { Command, CommandHandler } from '@theia/core';
import { ApplicationShell, OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';

import { EcoreModel } from './ecore-model';
import { EcoreTreeEditorWidget } from './ecore-tree-editor-widget';

export namespace EcoreTreeCommands {
    export const OPEN_WORKFLOW_DIAGRAM: Command = {
        id: 'workflow.open',
        label: 'Open Workflow Diagram'
    };
}

export class OpenWorkflowDiagramCommandHandler implements CommandHandler {
    constructor(protected readonly shell: ApplicationShell, protected readonly openerService: OpenerService) {}

    execute(): void {
        const editorWidget = this.getTreeEditorWidget();
        if (editorWidget) {
            const workflowNode = this.getSelectedWorkflow(editorWidget);
            if (workflowNode) {
                const notationUri = this.getNotationUri(editorWidget);
                this.openerService.getOpener(notationUri).then(opener => opener.open(notationUri, this.createServerOptions(workflowNode)));
            }
        }
    }

    isVisible(): boolean {
        const widget = this.getTreeEditorWidget();
        return !!widget && this.getSelectedWorkflow(widget) !== undefined;
    }

    getTreeEditorWidget(): EcoreTreeEditorWidget | undefined {
        const currentWidget = this.shell.currentWidget;
        if (currentWidget instanceof EcoreTreeEditorWidget) {
            return currentWidget;
        }
        return undefined;
    }

    getSelectedWorkflow(widget: EcoreTreeEditorWidget): TreeEditor.Node | undefined {
        if (widget && TreeEditor.Node.hasType(widget.selectedNode, EcoreModel.Type.Workflow)) {
            return widget.selectedNode;
        }
        return undefined;
    }

    getNotationUri(widget: EcoreTreeEditorWidget): URI {
        const coffeeUri = widget.uri;
        const coffeeNotationUri = coffeeUri.parent.resolve(coffeeUri.displayName + 'notation');
        return coffeeNotationUri;
    }

    createServerOptions(node: TreeEditor.Node): any {
        return {
            serverOptions: {
                workflowIndex: node.jsonforms.index
            }
        };
    }
}
