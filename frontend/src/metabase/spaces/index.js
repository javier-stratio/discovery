import React from 'react'
import ReactDOM from 'react-dom'

// routing
import curi from '@curi/core'
import createScrollSideEffect from '@curi/side-effect-scroll'
import { syncResponses } from '@curi/redux';
import Browser from '@hickory/browser'
import routes from './routes'

// store
import { Provider } from 'react-redux'
import store from './store'

// render
import render from './render'
import ConnectedBase from './ConnectedBase'

// create-react-app-boiler-plate
import registerServiceWorker from './registerServiceWorker'

const scrollTo = createScrollSideEffect()

const history = Browser()
const router = curi(history, routes, {
    sideEffects: [
        { fn: scrollTo, after: true }
    ]
})

syncResponses(store, router);

const root = document.getElementById('root')

router.respond((response, action) => {

    console.log("RESPONSE:", response)
    console.log("ACTION", action)

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedBase render={render} />
        </Provider>,
        root
    )
}, { once: true })

registerServiceWorker();
