import * as React from 'react';
import { Flex } from '@chakra-ui/core';

const Header: React.FunctionComponent = (props) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            {...props}
            >
        </Flex>
    )
 }


export default Header;