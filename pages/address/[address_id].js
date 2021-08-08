import Head from 'next/head';
import { Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
import { Uint64, VariableBlob, Str } from 'koinos-types2'
// import Koinos from 'koinos-types2';
import { get as _get } from 'lodash';

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// services
import { chain } from '@/services/chain';

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

              <Table bordered responsive>
                <tbody>
                  
                  <tr>
                    <td> Balance </td>
                    <td> { _get(props, 'balance', 0).toFixed(8) } { _get(props, 'symbol', 'TKOIN') } </td>
                  </tr>

                </tbody>
              </Table>

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
  let { address_id } = params;

  let _address = new Str(address_id)
  let vb = new VariableBlob();
  vb = _address.serialize(vb)

  // ger balance token
  let _balance = await chain.get_contract(
    "Mkw96mR+Hh71IWwJoT/2lJXBDl5Q=",
    0x15619248,
    vb.toJSON()
  )
  let balance = new VariableBlob(_balance.result);
  balance = Uint64.deserialize(balance)

  // get symbol token
  let _symbol = await chain.get_contract(
    "Mkw96mR+Hh71IWwJoT/2lJXBDl5Q=",
    0x7e794b24
  )
  let symbol = new VariableBlob(_symbol.result);
  symbol = Str.deserialize(symbol)

  return {
    props: {
      address: address_id,
      balance: parseInt( balance.num )/100000000,
      symbol: symbol.str
    }, // will be passed to the page component as props
  }
}

export default index