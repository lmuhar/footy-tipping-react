import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import customTheme from '../utils/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider resetCSS>
      <ThemeProvider theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
