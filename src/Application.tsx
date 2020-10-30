import * as React from 'react';
import { ChakraProvider, Flex } from "@chakra-ui/core"
import customTheme from './theme';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Header from './components/section/Header';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/forms/login';
import RegisterForm from './components/forms/register';

const Heading = styled.h1<{blue: boolean}>`
color: ${(props) => props.blue ? 'blue' : 'red'}; 
`;
const styles = css`color: red;`

/*
<Heading blue={false}>Heading 1</Heading>
<Button children={<div css={styles}>hello</div>} />
*/

const Application: React.FunctionComponent = (props) => { 
        return (
        <ChakraProvider theme={customTheme}>
          <Header/>
          <Flex direction="column" align="center" justify= "center">
          <Flex justify="center" align="center" w="100%" h="93vh">
            {props.children}
              <Switch>
                <Route path="/login">
                  <LoginForm/>
                </Route>
                <Route path="/register">
                  <RegisterForm/>
                </Route>
              </Switch>
          </Flex>
          </Flex>
        </ChakraProvider>
      );
}

export default Application;