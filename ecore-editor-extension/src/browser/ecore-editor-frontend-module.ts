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
import '../../css/coffee-tree-editor.css';
import '@eclipse-emfcloud/theia-tree-editor/style/forms.css';
import '@eclipse-emfcloud/theia-tree-editor/style/index.css';

import { createBasicTreeContainer, NavigatableTreeEditorOptions } from '@eclipse-emfcloud/theia-tree-editor';
import { CommandContribution, MenuContribution } from '@theia/core';
import { LabelProviderContribution, NavigatableWidgetOptions, OpenHandler, WidgetFactory } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { ContainerModule } from 'inversify';

import { EcoreTreeEditorContribution } from './ecore-editor-tree-contribution';
import { EcoreLabelProviderContribution } from './ecore-label-provider';
import { EcoreModelService } from './ecore-tree/ecore-model-service';
import { EcoreTreeNodeFactory } from './ecore-tree/ecore-node-factory';
import { CoffeeTreeEditorConstants, EcoreTreeEditorWidget } from './ecore-tree/ecore-tree-editor-widget';
import { EcoreTreeLabelProvider } from './ecore-tree/ecore-tree-label-provider-contribution';
import { Resolver } from './ecore-tree/resolver';

export default new ContainerModule(bind => {
    // Bind Theia IDE contributions
    bind(LabelProviderContribution).to(EcoreLabelProviderContribution);
    bind(OpenHandler).to(EcoreTreeEditorContribution);
    bind(MenuContribution).to(EcoreTreeEditorContribution);
    bind(CommandContribution).to(EcoreTreeEditorContribution);
    bind(LabelProviderContribution).to(EcoreTreeLabelProvider);

    // bind to themselves because we use it outside of the editor widget, too.
    bind(EcoreModelService).toSelf().inSingletonScope();
    bind(EcoreTreeLabelProvider).toSelf().inSingletonScope();

    bind(Resolver).toSelf().inSingletonScope();

    bind<WidgetFactory>(WidgetFactory).toDynamicValue(context => ({
        id: CoffeeTreeEditorConstants.WIDGET_ID,
        createWidget: (options: NavigatableWidgetOptions) => {

            const treeContainer = createBasicTreeContainer(
                context.container,
                EcoreTreeEditorWidget,
                EcoreModelService,
                EcoreTreeNodeFactory
            );

            // Bind options
            const uri = new URI(options.uri);
            treeContainer.bind(NavigatableTreeEditorOptions).toConstantValue({ uri });

            return treeContainer.get(EcoreTreeEditorWidget);
        }
    }));
});
