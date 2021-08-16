import NextApp from 'next/app';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Box>
        <Component {...pageProps} />
      </Box>
    );
  }
}
