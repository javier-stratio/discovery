export function getCurrentSpace ({ app, curi }) {
    return app.spaces.filter(space =>
        space.slug === curi.response.params.space
    )[0]
}

export function getMetricById ({ app, curi }) {
    return app.metrics.filter(m => m.id.toString() === curi.response.params.id)[0]
}

export function getDatabaseByID (state) {
    const { app, curi } = state
    return app.databases.filter(d => d.id.toString() === curi.response.params.id)[0]
}

export function getTableById (state) {
    const { app, curi } = state
    const table = app.tables.filter(t => {
        return t.id.toString() === curi.response.params.id
    })[0]
    return table
}

export function getMetricsForSpace (state) {
    return getEntityForSpace(state, 'metrics')
}

export function getDashboardsForSpace (state) {
    return getEntityForSpace(state,'dashboards')
}

export function getPulsesForSpace (state) {
    return getEntityForSpace(state, 'pulses')
}

export function getQuestionsForSpace (state) {
    return getEntityForSpace(state, 'questions')
}

export function getDatabasesForSpace (state) {
    return getEntityForSpace(state, 'databases')
}

export function getSegmentsForSpace (state) {
    return getEntityForSpace(state, 'segments')
}

export function getImportantSegmentsForSpace (state) {
    const segments = getSegmentsForSpace(state)
    const sapce = getCurrentSpace(state)
    return segments
}

export function getSegmentById (state) {
    return state.app.segments.filter(s => s.id.toString() === state.curi.response.params.id)[0]
}

export function getTablesForDB (state) {
    const dbID = getDatabaseByID(state).id
    return state.app.tables.filter(t => {
        return t.db.id === dbID
    })
}

export function getDashboard ({ app, curi }) {
    return app.dashboards.filter(d => {
        return d.id.toString() === curi.response.params.id
    })[0]
}

export function getQuestion ({ app, curi }) {
    return app.questions.filter(d => {
        return d.id.toString() === curi.response.params.id
    })[0]
}

export function getLogsForSpace (state) {
    const space = getCurrentSpace(state)
    // reverse to most recent logs are first
    return state.app.log.filter(l => l.spaceId === space.id).reverse()
}

// get a given entity type given a space
export function getEntityForSpace (state, entityType) {
    const { app, curi } = state

    const currentSpace = getCurrentSpace({ app, curi })

    // for the everything space
    if(currentSpace.global) {
        return app[entityType]
    }

    console.log('GET entity', entityType)
    console.log('----------', app[entityType])

    return app[entityType].filter(e => {
        return e.spaces && e.spaces[0] === currentSpace.id
    })
}
