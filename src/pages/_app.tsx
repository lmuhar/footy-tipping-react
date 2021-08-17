import NextApp from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import customTheme from '../utils/theme';

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
