import Head from 'next/head';

import { AppProps } from 'next/app';
import { colors } from 'constants/colors';

import GlobalStyles from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>myFlights</title>

        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content={colors.primary} />
      </Head>

      <GlobalStyles />

      <Component {...pageProps} />
    </>
  );
}

export default App;
