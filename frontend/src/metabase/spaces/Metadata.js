import React from 'react'
import { Box, ButtonOutline, Flex, Heading } from 'rebass'
import { connect } from 'react-redux'
import { Link } from '@curi/react'

import { getTableById } from './selectors'

const mapStateToProps = (state) => {
    const table = getTableById(state)
    return {
        table
    }
}

const Metadata = ({ table }) =>
    <Box style={{ height: '100vh' }}>
        <Flex align='center' mb={4}>
            <Heading><Link to='Table' params={{ id: table.id}}>{table.display_name}</Link> metadata</Heading>
            <ButtonOutline ml='auto'>
                Edit
            </ButtonOutline>
        </Flex>
        <img src={process.env.PUBLIC_URL + '/metadata.png'} />
    </Box>

export default connect(mapStateToProps)(Metadata)
