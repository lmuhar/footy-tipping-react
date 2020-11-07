import NextApp from 'next/app';
import { ChakraProvider } from "@chakra-ui/core";
import customTheme from '../theme';
import Header from './../components/section/Header';


export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
        <ChakraProvider theme={customTheme}>
            <Header/>
            <Component {...pageProps} />
        </ChakraProvider>
    );
  };
}