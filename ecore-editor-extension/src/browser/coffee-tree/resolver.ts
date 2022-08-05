/*!
 * Copyright (c) 2019-2020 G.Daniel
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 */

import { injectable } from 'inversify';
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { ID_PROP } from './model-server';

@injectable()
export class Resolver {

    private idToData : Map<string, object> = new Map<string, object>();

    public loadModel(root : TreeEditor.Node) {
        this.idToData.clear();
        this.loadDataTypes();
        this.idToData.set(root.jsonforms.data[ID_PROP], Object.assign({}, root.jsonforms.data));
        const recursion = (node: TreeEditor.Node): void => {
            this.idToData.set(node.jsonforms.data[ID_PROP], Object.assign({}, node.jsonforms.data));
            node.children.forEach(child => recursion(child as TreeEditor.Node));
        };
        root.children.forEach(node => recursion(node as TreeEditor.Node));
    }

    private loadDataTypes() {
        this.idToData.set('http://www.eclipse.org/emf/2002/Ecore#//EString', {
            "eClass":"http://www.eclipse.org/emf/2002/Ecore#//EClass",
            "@id":"//EString",
            "name":"EString",
            "abstract":false,
            "interface":false,
            "eStructuralFeatures":[]
        });
    }

    public resolve(id : string) {
        return this.idToData.get(id);
    }

}
