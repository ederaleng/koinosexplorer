import Head from 'next/head';
import {  Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
// import Koinos from 'koinos-types2';
import { get as _get } from 'lodash';

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// services
//import { chain } from '@/services/chain';

// utils
//import { address_to_bytes, to_base58, bytes_to_koin } from '@/utils/parsed'

function index(props) {
  return (
    <>
      <Head>
        <title> Koinos Explorer </title>
      </Head>

      <Navbar />
      <main className="container">

        <Row className="my-2">
          <Col>
            <Card>
              <Card.Header>
                <h5> Address { _get(props, 'address') } </h5>
              </Card.Header>
              <Card.Body>

                <h4 className="text-center"> Page in construction </h4>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        

      </main>
      <Footer/>
    </>
  )
}



export async function getServerSideProps({ params }) {
  let { address } = params;
  // let contract_id = 'Mkw96mR+Hh71IWwJoT/2lJXBDl5Q=';
  // let entry_point = 0x15619248;
  // let b = await address_to_bytes(address);
  // let args = await to_base58(b);
  // let result = await chain.get_contract(contract_id, entry_point, args)
  // console.log(_get(result, 'result', ''))
  // let koin_liquit = await bytes_to_koin(_get(result, 'result', ''));
  return {
    props: {
      address
    }, // will be passed to the page component as props
  }
}

export default index