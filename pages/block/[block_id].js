import Head from 'next/head';
import Link from 'next/link';
import { get as _get } from 'lodash';
import {  Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
import moment from 'moment';

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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
                    <td> { moment(_get(props, 'block.block.header.timestamp', '')).format('DD-MM-YYYY H:mm:ss') } </td>
                  </tr>
 
                </tbody>
              </Table>


              <Card>
                <Card.Header>
                  <h5> Transactions </h5>
                </Card.Header>
                <Card.Body>

                  {
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
                              <td> { _get(tx, 'id', '').substring(0, 15) } </td>
                              <td> { _get(tx, 'active_data.nonce', '') } </td>
                              <td>
                                {
                                  _get(tx, 'active_data.operations', '')
                                  .map((op, op_key) => (
                                    <Card key={"op_"+op_key}>
                                      <Card.Header>
                                        <b> { _get(op, 'type') } </b>
                                      </Card.Header>
                                      <ListGroup variant="flush">
                                        {
                                          Object.keys(_get(op, 'value'))
                                          .map((v_key, key) => {
                                            var value_d = _get(op, `value.${v_key}`);
                                            if(typeof value_d == "object" || typeof value_d == "function" || typeof value_d == "undefined")
                                              value_d = JSON.stringify(value_d)
                                            return (
                                              <ListGroup.Item key={"list_tx_"+key}>
                                                { v_key.replace(/_/g, ' ') }: { value_d.length > 50 ? value_d.substring(0, 48) + '...' : value_d }
                                              </ListGroup.Item>
                                            )
                                          })
                                        }
                                      </ListGroup>
                                    </Card>
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
  let block_info = await block_store.get_blocks_by_height(
    _get(chain_head, 'head_topology.id', ''),
    parseInt(block_id),
    1
  )
  let block_request = [ _get(block_info,'block_items[0].block_id',0) ];
  let block_data = await block_store.get_blocks_by_id(block_request);


  /**
   * Parsed data
   */
  let _block = _get(block_data, 'block_items[0]', null);

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
