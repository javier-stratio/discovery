import React from 'react'
import { connect } from 'react-redux'
import { Link } from '@curi/react'
import { getCurrentSpace } from './selectors'

const mapStateToProps = (state) => {
    return {
        space: getCurrentSpace(state)
    }
}


const SpaceHomeLink = ({ space }) =>
    space ? (
        <Link to='Guide' params={{ space: space.slug }}>
            { space.name }
        </Link>
    ) : null

export default connect(mapStateToProps)(SpaceHomeLink)
