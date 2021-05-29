import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';
import { TomtomMapGlobalStyle } from '../components/TomtomMapGlobalStyle';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TomtomMapGlobalStyle />
      <Head>
        <title>Welcome to sankana-api!</title>
      </Head>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default CustomApp;
