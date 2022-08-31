/*!
 * Copyright (c) 2022 Naomod and others.
 */
import { JsonSchema7 } from '@jsonforms/core';

export const customSystemView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'CustomSystem'
        }
    ]
};

export const stateMachineView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'StateMachine'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const regionView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'Region'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const pseudoStateView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'PseudoState'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const stateView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'State'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const finalStateView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'FinalState'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const transitionView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'Transition'
        },
        {
            type: 'Control',
            label: 'Kind',
            scope: '#/properties/kind'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Control',
            label: 'Source',
            scope: '#/properties/source/properties/name'
        },
        {
            type: 'Control',
            label: 'Target',
            scope: '#/properties/target/properties/name'
        }
    ]
};

export const smSchema: JsonSchema7 = {
    'definitions': {
        'transition': {
            '$id': '#transition',
            'title': 'Transition',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//Transition'
                },
                'name': {
                    'type': 'string'
                },
                'source': {
                    '$ref': '#/definitions/state'
                },
                'target': {
                    '$ref': '#/definitions/state'
                },
                'kind': {
                    'type': 'string'
                }
            },
            'additionalProperties': false
        },
        'state': {
            '$id': '#state',
            'title': 'State',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//State'
                },
                'name': {
                    'type': 'string'
                },
                'outgoingTransitions': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/transition'
                    }
                },
                'incomingTransitions': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/transition'
                    }
                }
            },
            'additionalProperties': false
        },
        'pseudoState': {
            '$id': '#pseudoState',
            'title': 'PseudoState',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//Pseudostate'
                },
                'name': {
                    'type': 'string'
                }
            },
            'additionalProperties' : false
        },
        'region': {
            '$id': '#region',
            'title': 'Region',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//Region'
                },
                'name': {
                    'type': 'string'
                }
            },
            'additionalProperties': false
        },
        'stateMachine': {
            '$id': '#stateMachine',
            'title': 'StateMachine',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//CustomSystem'
                },
                'name': {
                    'type': 'string'
                },
                'regions': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/region'
                    }
                }
            },
            'additionalProperties': false
        },
        'customSystem': {
            '$id': '#customSystem',
            'title': 'CustomSystem',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://org.imt.pssm.reactive/statemachines/#//CustomSystem'
                },
                'stateMachine': {
                    '$ref': '#/definitions/stateMachine'
                },
            },
            'additionalProperties': false,
        },

    }
}
