import NextApp from 'next/app';
import { ChakraProvider } from "@chakra-ui/core";
import customTheme from '../theme';


export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
    );
  };
}