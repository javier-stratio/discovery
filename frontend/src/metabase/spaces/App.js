import React, { Component } from 'react'
import { connect } from 'react-redux'
import cxs from 'cxs'
import { Link } from '@curi/react'
import { Box, Border, Button, Card, Flex, Heading, Subhead } from 'rebass'

const mapStateToProps = ({ app }) => ({
    spaces: app.spaces,
    log: app.log.reverse().slice(0, 15),
    databases: app.databases
})

class App extends Component {
    render() {
        const { databases, spaces, log } = this.props
        return (
            <Box>
                <Flex align='center' py={3}>
                    <Heading>Hey there, Kyle</Heading>
                </Flex>
                <Box mt={4}>
                    <Flex align='center' py={3}>
                        <Heading>Collections</Heading>
                        <Box ml='auto'>
                            <Link to='NewCollection'>
                                <Button>New collection</Button>
                            </Link>
                        </Box>
                    </Flex>
                    <Flex wrap>
                        { spaces.map(space => {
                            return (
                                <Box w={1/3} p={3}>
                                    <Link
                                        to='Guide'
                                        params={{ space: space.slug }}
                                        key={space.id}
                                    >
                                        <Card bg='white' p={3} style={{ height: 200 }}>
                                            <Subhead>{space.name}</Subhead>
                                            <p>{space.description}</p>
                                        </Card>
                                    </Link>
                                </Box>
                            )
                        })}
                    </Flex>
                </Box>

                <Box my={3}>
                    <Subhead>Explore data</Subhead>
                    { databases.map(d =>
                        <Box>
                            <Link to='DB' params={{ id: d.id  }}>
                                <Subhead>{d.name}</Subhead>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }
}


export default connect(mapStateToProps)(App);
