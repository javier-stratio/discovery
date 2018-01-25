import React from 'react'
import { connect } from 'react-redux'
import { Link } from '@curi/react'
import { Box, Border, Flex, Heading, Subhead } from 'rebass'

import Select from 'react-select'
import 'react-select/dist/react-select.css';

import { getQuestionsForSpace, getCurrentSpace } from './selectors'

import PinLink from './PinLink'

import { pinItem } from './logic'

const mapStateToProps = (state) => {
    return {
        space: getCurrentSpace(state),
        questions: getQuestionsForSpace(state)
    }
}

const Questions = ({ questions, space, dispatch }) =>
    <div>
        <Box w={2/3}>
            <Flex align='center' mb={3}>
                <Heading>
                    Questions
                </Heading>
                <Box ml='auto'>
                    <Select
                        width={200}
                        value={{ label: 'All', value: 'all' }}
                        options={[
                            { label: 'All', value: 'all' },
                            { label: 'Mine', value: 'mine' },
                            { label: 'Favorites', value: 'favorites' },
                        ]}
                        search={false}
                        clearable={false}
                    />
                </Box>
            </Flex>
            { questions.map(q =>
                <Border bottom py={1}>
                        <Flex align='center'>
                            <Link to='Question' params={{ space: space.slug, id: q.id }}>
                                <h3>{q.name}</h3>
                            </Link>
                            <Box ml='auto'>
                                <Flex align='center'>
                                    <Box mx={2}>
                                        <PinLink />
                                    </Box>
                                    <Box onClick={() => dispatch(pinItem(space.id, 'question', q))}>
                                        ARCHIVE
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                </Border>
            )}
        </Box>
    </div>

export default connect(mapStateToProps)(Questions)
