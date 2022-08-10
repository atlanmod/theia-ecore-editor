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
import { JsonSchema7 } from '@jsonforms/core';

export const epackageView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EPackage'
        },
        {
            type: 'Group',
            label: 'EPackage Definition',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Name',
                            scope: '#/properties/name'
                        },
                        {
                            type: 'Control',
                            label: 'nsURI',
                            scope: '#/properties/nsURI'
                        },
                        {
                            type: 'Control',
                            label: 'nsPrefix',
                            scope: '#/properties/nsPrefix'
                        }
                    ]
                }
            ]
        }
    ]
};

export const eclassView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EClass'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Group',
            label: 'Type Definition',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Abstract',
                            scope: '#/properties/abstract'
                        },
                        {
                            type: 'Control',
                            label: 'Interface',
                            scope: '#/properties/interface'
                        }
                    ]
                }
            ]
        }
    ]
};

export const ereferenceView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EReference'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Group',
            label: 'Type Definition',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'EType',
                            scope: '#/properties/eType/properties/name'
                        },
                        {
                            type: 'Control',
                            label: 'EOpposite',
                            scope: '#/properties/eOpposite/properties/name'
                        }
                    ]
                }
            ]
        },
        {
            type: 'Group',
            label: 'Cardinalities',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Lower Bound',
                            scope: '#/properties/lowerBound'
                        },
                        {
                            type: 'Control',
                            label: 'Upper Bound',
                            scope: '#/properties/upperBound'
                        }
                    ]
                }
            ]
        },
        {
            type: 'Group',
            label: 'Containment',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Container',
                            scope: '#/properties/container'
                        },
                        {
                            type: 'Control',
                            label: 'Containment',
                            scope: '#/properties/containment'
                        }
                    ]
                }
            ]
        },
        {
            type: 'Group',
            label: 'Advanced',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Ordered',
                            scope: '#/properties/ordered'
                        },
                        {
                            type: 'Control',
                            label: 'Unique',
                            scope: '#/properties/unique'
                        },
                        {
                            type: 'Control',
                            label: 'Changeable',
                            scope: '#/properties/changeable'
                        },
                        {
                            type: 'Control',
                            label: 'Volatile',
                            scope: '#/properties/volatile'
                        },
                        {
                            type: 'Control',
                            label: 'Transient',
                            scope: '#/properties/transient'
                        },
                        {
                            type: 'Control',
                            label: 'Unsettable',
                            scope: '#/properties/unsettable'
                        },
                        {
                            type: 'Control',
                            label: 'Derived',
                            scope: '#/properties/derived'
                        },
                        {
                            type: 'Control',
                            label: 'Resolve Proxies',
                            scope: '#/properties/resolveProxies'
                        }
                    ]
                }
            ]
        }
    ]
};

export const eattributeView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EAttribute'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Group',
            label: 'Type Definition',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'EType',
                            scope: '#/properties/eType/properties/name'
                        }
                    ]
                }
            ]
        },
        {
            type: 'Group',
            label: 'Cardinalities',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Lower Bound',
                            scope: '#/properties/lowerBound'
                        },
                        {
                            type: 'Control',
                            label: 'Upper Bound',
                            scope: '#/properties/upperBound'
                        }
                    ]
                }
            ]
        },
        {
            type: 'Group',
            label: 'Advanced',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            label: 'Ordered',
                            scope: '#/properties/ordered'
                        },
                        {
                            type: 'Control',
                            label: 'Unique',
                            scope: '#/properties/unique'
                        },
                        {
                            type: 'Control',
                            label: 'Changeable',
                            scope: '#/properties/changeable'
                        },
                        {
                            type: 'Control',
                            label: 'Volatile',
                            scope: '#/properties/volatile'
                        },
                        {
                            type: 'Control',
                            label: 'Transient',
                            scope: '#/properties/transient'
                        },
                        {
                            type: 'Control',
                            label: 'Unsettable',
                            scope: '#/properties/unsettable'
                        },
                        {
                            type: 'Control',
                            label: 'Derived',
                            scope: '#/properties/derived'
                        },
                        {
                            type: 'Control',
                            label: 'Is ID',
                            scope: '#/properties/iD'
                        }
                    ]
                }
            ]
        }
    ]
};

export const eenumView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EEnum'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        }
    ]
};

export const eenumliteralView = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Label',
            text: 'EEnumLiteral'
        },
        {
            type: 'Control',
            label: 'Name',
            scope: '#/properties/name'
        },
        {
            type: 'Control',
            label: 'Value',
            scope: '#/properties/value'
        },
        {
            type: 'Control',
            label: 'Literal',
            scope: '#/properties/literal'
        }
    ]
};

// TODO UI schemas should be stored in the workspace and handled by the modelserver instead of hard coded copies in code

// TODO JSONSchema should be fetched from the modelserver instead of hard coded copy in code
export const ecoreSchema: JsonSchema7 = {
    'definitions': {
        'ePackage': {
            '$id': '#ePackage',
            'title': 'EPackage',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EPackage'
                },
                'eClassifiers': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/eClass'
                    }
                },
                'name': {
                    'type': 'string'
                },
                'nsURI': {
                    'type': 'string'
                },
                'nsPrefix': {
                    'type': 'string'
                }
            },
            'additionalProperties': false,
            'required': [
                'name'
            ]
        },
        'eEnum': {
            '$id': '#eEnum',
            'title': 'EEnum',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EEnum'
                },
                'eLiterals': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/eEnumLiteral'
                    }
                },
                'name': {
                    'type': 'string'
                }
            }
        },
        'eEnumLiteral': {
            '$id': '#eEnumLiteral',
            'title': 'EEnumLiteral',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EEnumLiteral'
                },
                'name': {
                    'type': 'string'
                },
                'value': {
                    'type': 'integer'
                },
                'literal': {
                    'type': 'string'
                }
            }
        },
        'eClass': {
            '$id': '#eClass',
            'title': 'EClass',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EClass'
                },
                'name': {
                    'type': 'string'
                },
                'abstract': {
                    'type': 'boolean'
                },
                'interface': {
                    'type': 'boolean'
                }
            },
            'additionalProperties': false,
            'required': [
                'name'
            ]
        },
        'eReference': {
            '$id': '#eReference',
            'title': 'EReference',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EReference'
                },
                'name': {
                    'type': 'string'
                },
                'container': {
                    'type': 'boolean'
                },
                'containment': {
                    'type': 'boolean'
                },
                'lowerBound': {
                    'type': 'integer'
                },
                'upperBound': {
                    'type': 'integer'
                },
                'eType': {
                    '$ref': '#/definitions/eClass'
                },
                'eOpposite': {
                    '$ref': '#/definitions/eReference'
                },
                'ordered': {
                    'type': 'boolean'
                },
                'unique': {
                    'type': 'boolean'
                },
                'changeable': {
                    'type': 'boolean'
                },
                'volatile': {
                    'type': 'boolean'
                },
                'transient': {
                    'type': 'boolean'
                },
                'unsettable': {
                    'type': 'boolean'
                },
                'derived': {
                    'type': 'boolean'
                },
                'resolveProxies': {
                    'type': 'boolean'
                }
            },
            'additionalProperties': false,
            'required': [
                'name'
            ]
        },
        'eAttribute': {
            '$id': '#eAttribute',
            'title': 'EAttribute',
            'type': 'object',
            'properties': {
                'eClass': {
                    'const': 'http://www.eclipse.org/emf/2002/Ecore#//EAttribute'
                },
                'name': {
                    'type': 'string'
                },
                'lowerBound': {
                    'type': 'integer',
                },
                'upperBound': {
                    'type': 'integer'
                },
                'eType': {
                    '$ref': '#/definitions/eClass'
                },
                'ordered': {
                    'type': 'boolean'
                },
                'unique': {
                    'type': 'boolean'
                },
                'changeable': {
                    'type': 'boolean'
                },
                'volatile': {
                    'type': 'boolean'
                },
                'transient': {
                    'type': 'boolean'
                },
                'unsettable': {
                    'type': 'boolean'
                },
                'derived': {
                    'type': 'boolean'
                },
                'iD': {
                    'type': 'boolean'
                }
            },
            'additionalProperties': false,
            'required': [
                'name'
            ]
        }
    }
};
