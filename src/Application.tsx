import * as React from 'react';
import {ThemeProvider, CSSReset, Button} from '@chakra-ui/core';
import customTheme from './theme';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import LandingLayout from './components/layout/Layout';
// import {Router, Switch, Route} from 'react-router';

const Heading = styled.h1<{blue: boolean}>`
color: ${(props) => props.blue ? 'blue' : 'red'}; 
`;
const styles = css`color: red;`

const Application: React.FunctionComponent = (props) => { 
        return (
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          {props.children}
          <LandingLayout />

          <Heading blue={false}>Heading 1</Heading>
          <Button children={<div css={styles}>hello</div>} />
        </ThemeProvider>
      );
}

export default Application;