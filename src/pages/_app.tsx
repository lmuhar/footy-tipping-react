import NextApp from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import customTheme from '../utils/theme';
import { ChakraProvider } from '@chakra-ui/react';

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ChakraProvider resetCSS>
        <ThemeProvider theme={customTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    );
  }
}
