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
import URI from '@theia/core/lib/common/uri';

export namespace EcoreModel {
    export namespace Type {
        export const EPackage = 'http://www.eclipse.org/emf/2002/Ecore#//EPackage';
        export const EClass = 'http://www.eclipse.org/emf/2002/Ecore#//EClass';
        export const EReference = 'http://www.eclipse.org/emf/2002/Ecore#//EReference';
        export const EAttribute = 'http://www.eclipse.org/emf/2002/Ecore#//EAttribute';
        export const EEnum = 'http://www.eclipse.org/emf/2002/Ecore#//EEnum';
        export const EEnumLiteral = 'http://www.eclipse.org/emf/2002/Ecore#//EEnumLiteral';

        export function name(type: string): string {
            return new URI(type).fragment.substring(2);
        }
    }

    /*const components = [Type.EPackage, Type.EClass, Type.EEnum];*/

    const nodes = [Type.EReference, Type.EAttribute, Type.EEnumLiteral];

    /** Maps types to their creatable children */
    export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.EPackage,
            [
                {
                    property: 'eClassifiers',
                    children: nodes
                }
            ]
        ],
        [
            Type.EClass,
            [
                {
                    property: 'eStructuralFeatures',
                    children: nodes
                }
            ]
        ],
        [
            Type.EEnum,
            [
                {
                    property: 'eLiterals',
                    children: nodes
                }
            ]
        ],
    ]);
}
