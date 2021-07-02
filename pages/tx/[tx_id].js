import Head from 'next/head'
import { Card, Row, Col, Table } from 'react-bootstrap';
import { get as _get } from 'lodash'

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// services
import { block_store } from '@/services/block_store';

function Tx(props) {
  return (
    <>
      <Head>
        <title> Koinos Transaction | KoinosExplorer </title>
      </Head>

      <Navbar />
      <main className="container">

        <Row className="my-2">
          <Col>
            <Card>
              <Card.Header>
                <h5> Transaction Details </h5>
              </Card.Header>
              <Card.Body>

                {/* <Table bordered responsive>
                  <tbody>
                    
                    <tr>
                      <td> Block number </td>
                      <td> text </td>
                    </tr>
  
                  </tbody>
                </Table> */}
                
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
  let { tx_id } = params;

  /**
   * Request data
   */
  // let tx_data = await block_store.get_transactions_by_id(tx_id);
  // console.log("here", tx_data)

  /**
   * Parsed data
   */

  return {
    props: {
      tx: tx_id
    }, // will be passed to the page component as props
  }
}


export default Tx;