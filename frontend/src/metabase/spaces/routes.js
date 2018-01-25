import React from 'react'

import App from './App' // RENAME TO SPACES LIST 
import Data from './Data'
import Guide from './Guide'
import Shared from './Shared'
import Dashboard from './Dashboard'
import Database from './Database'
import Table from './Table'
import Questions from './Questions'
import Question from './Question'
import Profile from './Profile'
import NQF from './NQF'

// Metric list and detail
import Metrics from './Metrics'
import Metric from './Metric'
import MetricPublish from './MetricPublish'
import MetricDescription from './MetricDescription'
import Publish from './Publish'
import SegmentPublish from './SegmentPublish'
import Segment from './Segment'
import Segments from './Segments'
import Metadata from './Metadata'

import NewCollection from './NewCollection'

// Layouts
import OverworldLayout from './layouts/Overworld'
import SpaceLayout from './layouts/Space'
import EntityLayout from './layouts/Entity'

const routes = [
    {
        name: 'Home',
        path: '',
        match: {
            response: ({ set }) => {
                set.body({
                    layout: OverworldLayout,
                    view: App
                })
            }
        }
    },
    {
        name: 'Profile',
        path: 'profile',
        match: {
            response: ({ set }) => {
                set.body({
                    layout: OverworldLayout,
                    view: Profile
                })
            }
        }
    },
    {
        name: 'New',
        path: 'new',
        match: {
            response: ({ set }) => {
                set.body({
                    layout: EntityLayout,
                    view: NQF
                })
            }
        }
    },
    {
        name: 'NewCollection',
        path: 'collection/new',
        match: {
            response: ({ set }) => {
                set.body({
                    layout: EntityLayout,
                    view: NewCollection
                })
            }
        }
    },
    {
        name: 'Data',
        path: 'data',
        match: {
            response: ({ set }) => {
                set.body({
                    layout: EntityLayout,
                    view: Data
                })
            }
        },
        children: [
            {
                name: 'DB',
                path: 'db/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Database
                        }) 
                    }
                },
                children: [{
                    name: 'SQL',
                    path: ':sql',
                    match: {
                        response: ({ set }) => {
                            set.body({
                                layout: EntityLayout,
                                view: Database
                            }) 
                        }
                    },
                }]
            },
            {
                name: 'Table',
                path: 'table/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Table
                        }) 
                    }
                },
                children: [
                    {
                        name: 'QB',
                        path: ':qb',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Table
                                }) 
                            }
                        },

                    },
                    {
                        name: 'Metadata',
                        path: 'm/metadata',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Metadata
                                }) 
                            }
                        },

                    },
                    {
                        name: 'TScalar',
                        path: 'e/:scalar',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Table
                                }) 
                            }
                        },

                    },
                    {
                        name: 'TTime',
                        path: 't/:time',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Table
                                }) 
                            }
                        },

                    },
                ]
            }
        ]
    },
    {
        name: 'Space',
        path: ':space',
        children: [
            {
                name: 'Guide',
                path: 'guide',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: SpaceLayout,
                            view: Guide
                        }) 
                    }
                }
            },
            {
                name: 'Questions',
                path: 'questions',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: SpaceLayout,
                            view: Questions 
                        })
                    }
                }
            },
            {
                name: 'Shared',
                path: 'shared',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: SpaceLayout,
                            view: Shared 
                        })
                    }
                }
            } ,
            {
                name: 'Dashboard',
                path: 'dashboard/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Dashboard
                        })
                    }

                }
            },
            {
                name: 'Metrics',
                path: 'metrics',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: SpaceLayout,
                            view: Metrics
                        }) 
                    }
                }
            },
            {
                name: 'Metric',
                path: 'metric/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Metric
                        }) 
                    }
                },
                children: [
                    {
                        name: 'MQB',
                        path: ':qb',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Metric
                                }) 
                            }
                        }
                    },
                    {
                        name: 'MFiltered',
                        path: 'f/:segmentId',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Metric
                                }) 
                            }
                        }
                    }
                ]
            } ,
            {
                name: 'Segments',
                path: 'segments',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: SpaceLayout,
                            view: Segments
                        }) 
                    }
                },
            },
            {
                name: 'Segment',
                path: 'segment/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Segment
                        }) 
                    }
                },
                children: [
                    {
                        name: 'SegmentQB',
                        path: ':qb',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Segment
                                }) 
                            }
                        }
                    }
                ]
            } ,
            {
                name: 'Question',
                path: 'question/:id',
                match: {
                    response: ({ set }) => {
                        set.body({
                            layout: EntityLayout,
                            view: Question
                        }) 
                    }
                },
                children: [
                    {
                        name: 'QQB',
                        path: ':qb',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Question
                                }) 
                            }
                        }
                    },
                    {
                        name: 'QEdit',
                        path: 'e/:edit',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Question
                                }) 
                            }
                        }
                    },
                    {
                        name: 'Publish',
                        path: 'p/publish',
                        match: {
                            response: ({ set }) => {
                                set.body({
                                    layout: EntityLayout,
                                    view: Publish
                                }) 
                            }
                        },
                        children: [
                            {
                                name: 'MetricPublish',
                                path: 'metric',
                                match: {
                                    response: ({ set }) => {
                                        set.body({
                                            layout: EntityLayout,
                                            view: MetricPublish
                                        }) 
                                    }
                                },
                            },
                            {
                                name: 'MetricDescription',
                                path: 'metric/details',
                                match: {
                                    response: ({ set }) => {
                                        set.body({
                                            layout: EntityLayout,
                                            view: MetricDescription
                                        }) 
                                    }
                                },
                            },
                            {
                                name: 'SegmentPublish',
                                path: 'segment',
                                match: {
                                    response: ({ set }) => {
                                        set.body({
                                            layout: EntityLayout,
                                            view: SegmentPublish
                                        }) 
                                    }
                                },
                            }
                        ]
                    }
                ]
            } ,
        ],
    }
]

export default routes
