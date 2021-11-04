import Head from 'next/head';
import Link from 'next/link';
import { get as _get } from 'lodash';
import {  Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
import moment from 'moment';

// Blockchain
import TokenContract from '@/proto/koinos/rpc/block_store/block_store_rpc_pb';

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
// import Transactions from '@/components/transactions';

// services
import { block_store } from '@/services/block_store';
import { chain } from '@/services/chain';


function Block(props) {
  return (
    <>
      <Head>
        <title> Koinos Block # { _get(props, 'block.block_height', '') } | KoinosExplorer </title>
      </Head>

      <Navbar />
      <main className="container">

        <Row className="my-2">
          <Col>
            <Card>
              <Card.Header>
                <h5> Block { _get(props, 'block.block_height', '') } </h5>
              </Card.Header>
              <Card.Body>

              <Table bordered responsive>
                <tbody>
                  
                  <tr>
                    <td> Block number </td>
                    <td> { _get(props, 'block.block.header.height', '') } </td>
                  </tr>
                  <tr>
                    <td> Block id </td>
                    <td> { _get(props, 'block.block_id', '') } </td>
                  </tr>
                  <tr>
                    <td> Previous block id </td>
                    <td>
                      { _get(props, 'block.block.header.previous', '') }
                    </td>
                  </tr>
                  <tr>
                    <td> Timestamp </td>
                    <td> { moment.unix( _get(props, 'block.block.header.timestamp', '')/1000 ).format('DD-MM-YYYY H:mm:ss') } </td>
                  </tr>
 
                </tbody>
              </Table>


              <Card>
                <Card.Header>
                  <h5> Transactions </h5>
                </Card.Header>
                <Card.Body>
                  <h5 className="text-center"> Transactions history under construction </h5>


                  {
                    /*
                    _get(props, 'block.block.transactions', '').length > 0 ?
                    <Table bordered responsive>
                      <thead>
                        <tr>
                          <th> Tx id </th>
                          <th> Nonce </th>
                          <th> Operation </th>
                          <th> Resource limit </th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          
                          _get(props, 'block.block.transactions', '')
                          .map((tx, tx_key) => (
                            <tr key={'tx_'+tx_key}>
                              <td>
                                <Link href={`/tx/${ _get(tx, 'id', '') }`} className="link_next">

                                  { _get(tx, 'id', '').length > 15 ? _get(tx, 'id', '').substring(0, 15)+'...' : _get(tx, 'id', '') }

                                </Link>
                              </td>
                              <td> { _get(tx, 'active_data.nonce', '') } </td>
                              <td>
                                {
                                  _get(tx, 'active_data.operations', '')
                                  .map((op, op_key) => (
                                    <Transactions op={op} key={op_key} />
                                  ))
                                }
                              </td>
                              <td> { _get(tx, 'active_data.resource_limit', '') } </td>
                            </tr>
                          ))

                        }

                      </tbody>
                    </Table>
                    : 
                    <div className="text-center"> 0 Transactions in block { _get(props, 'block.block_height', '') } </div>
                    */
                  }

                </Card.Body>
              </Card>


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
  let { block_id } = params;

  /**
   * Request data
   */
  let chain_head = await chain.get_head();
  let block = await block_store.get_blocks_by_height(
    _get(chain_head, 'head_topology.id', ''),
    parseInt(block_id),
    1
  )

  
  /**
   * Parsed data
   */
  let _block = _get(block, 'block_items[0]', null);
  // console.log(JSON.stringify(_block))
  if( _get(_block, 'block', null) == null) {
    return {
      redirect: {
        destination: "/404",
      },
      props:{},
    };
  }

  return {
    props: {
      block: _block
    }
  }
}

export default Block;
