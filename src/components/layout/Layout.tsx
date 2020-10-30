import * as React from 'react';
import { Flex, Text, Link } from '@chakra-ui/core';
import Header from '../section/Header';

const LandingLayout: React.FunctionComponent = (props) => {
    return (
        <Flex 
            direction="column"
            align="center"
            maxW={{ xl: "1200px" }}
            m="0 auto"
            {...props}
            >
            <Header/>
            {props.children}
        </Flex>
    )
}

export default LandingLayout;