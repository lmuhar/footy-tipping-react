import * as React from 'react';
import { Flex } from '@chakra-ui/core';

const LandingLayout: React.FunctionComponent = (props) => {
    return (
        <Flex 
            direction="column"
            align="center"
            maxW={{ xl: "1200px" }}
            m="0 auto"
            {...props}
            >
            {props.children}
        </Flex>
    )
}

export default LandingLayout;