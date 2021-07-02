import Head from 'next/head'

// components global
import Navbar from './../../components/navbar'
import Footer from './../../components/footer'

function Tx() {
  return (
    <>
      <Head>
        <title> Koinos Explorer </title>
      </Head>

      <Navbar />
      <main className="container">
        <div>
          Tx
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Tx;