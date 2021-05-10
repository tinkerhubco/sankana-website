import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Head>
        <title>Sankana - Disrupting Filipino Time</title>
      </Head>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
};

export default CustomApp;
