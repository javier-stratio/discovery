export function saveState (state) {
    try {
        const serialized = JSON.stringify(state)
        localStorage.setItem('spaces', serialized)
    } catch (error) {
        console.log('save state error', error)
    }
}

export function loadState () {
    try {
        const serialized = localStorage.getItem('spaces')
        // if nothing is saved in localStorage just let the reducers to initial
        if(serialized ===  null) {
            return undefined
        }
        return JSON.parse(serialized)
    } catch (error) {
        // just let the reducers do initial state
        return undefined
    }

}
