import Head from "next/head";

// styles
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import './../styles/owner.css'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
