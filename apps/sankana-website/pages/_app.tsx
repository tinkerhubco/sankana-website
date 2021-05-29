import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

import { TomtomMapGlobalStyle } from '../components/TomtomMapGlobalStyle';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <TomtomMapGlobalStyle />
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
