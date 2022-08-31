/*!
 * Copyright (c) 2022 Naomod and others.
 */

import URI from '@theia/core/lib/common/uri';
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';

export namespace SmModel {
    export namespace Type {
        export const CustomSystem = 'http://org.imt.pssm.reactive/statemachines/#//CustomSystem';
        export const StateMachine = 'http://org.imt.pssm.reactive/statemachines/#//StateMachine';
        export const Region = 'http://org.imt.pssm.reactive/statemachines/#//Region';
        export const PseudoState = 'http://org.imt.pssm.reactive/statemachines/#//Pseudostate';
        export const State = 'http://org.imt.pssm.reactive/statemachines/#//State';
        export const FinalState = 'http://org.imt.pssm.reactive/statemachines/#//FinalState';
        export const Transition = 'http://org.imt.pssm.reactive/statemachines/#//Transition';
        export function name(type: string): string {
            return new URI(type).fragment.substring(2);
        }
    }

    const nodes = [Type.StateMachine, Type.Region, Type.PseudoState, Type.State, Type.FinalState, Type.Transition];

    export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.CustomSystem,
            [
                {
                    property: 'stateMachine',
                    children: nodes
                }
            ]
        ],
        [
            Type.StateMachine,
            [
                {
                    property: 'regions',
                    children: nodes
                }
            ]
        ],
        [
            Type.Region,
            [
                {
                    property: 'vertice',
                    children: nodes
                }
            ]
        ],
    ]);
}
