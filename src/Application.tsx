import * as React from 'react';
import {ThemeProvider, CSSReset, Button} from '@chakra-ui/core';
import customTheme from './theme';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

const Heading = styled.h1<{blue: boolean}>`
color: ${(props) => props.blue ? 'blue' : 'red'}; 
`;
const styles = css`color: red;`

const Application: React.FunctionComponent = (props) => { 
        return (
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          {props.children}
          <Heading blue={false}>Heading 1</Heading>
          <Button children={<div css={styles}>hello</div>} />
        </ThemeProvider>
      );
}

export default Application;