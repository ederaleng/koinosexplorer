import Head from 'next/head';
import Link from 'next/link';
import {  Card, Row, Col, Table } from 'react-bootstrap';
import { get as _get } from 'lodash'

// components global
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// services
import { chain } from '@/services/chain';
import { block_store } from '@/services/block_store';


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
                <h5> Config Global </h5>
              </Card.Header>
              <Card.Body>

              <Table striped bordered hover responsive>
                <tbody>
                  <tr>
                    <td> Chain id </td>
                    <td> { _get(props, 'chain_id') } </td>
                  </tr>
                  <tr>
                    <td> Head block </td>
                    <td>
                      <Link href={`/block/${ _get(props, 'chain_head.head_topology.height') }`} className="link_next">
                        <a> { _get(props, 'chain_head.head_topology.height') } </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td> Block id </td>
                    <td> { _get(props, 'chain_head.head_topology.id') } </td>
                  </tr>
                  <tr>
                    <td> Previous block id </td>
                    <td> { _get(props, 'chain_head.head_topology.previous') } </td>
                  </tr>
                  <tr>
                    <td> Irreversible block </td>
                    <td>
                      <Link href={`/block/${ _get(props, 'chain_head.last_irreversible_height') }`} className="link_next">
                        <a> { _get(props, 'chain_head.last_irreversible_height') } </a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-2">
          <Col>
            <Card>
              <Card.Header>
                <h5> Last 10 Block </h5>
              </Card.Header>
              <Card.Body>

              <Table bordered responsive>
                <thead>
                  <tr>
                    <th> Block number </th>
                    <th> Block id  </th>
                    <th> Transactions </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    _get(props, 'blocks')
                    .map((block, key) => (
                      <tr key={"block"+key}>
                        <td>
                          <Link href={`/block/${ _get(block, 'block_height') }`} className="link_next">
                            <a> { _get(block, 'block_height') } </a>
                          </Link>
                        </td>
                        <td> { _get(block, 'block_id') } </td>
                        <td> { _get(block, 'block.transactions').length } </td>
                      </tr>
                    ))
                  }
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

export async function getServerSideProps() {
  /**
   * Request data
   */
  let chain_id = await chain.get_chain_id();
  let chain_head = await chain.get_head();
  let block_new_data = await block_store.get_blocks_by_height(
    _get(chain_head, 'head_topology.id', ''),
    _get(chain_head, 'head_topology.height', 0) - 10,
    10
  )
  
  
  let list_blocks = _get(block_new_data, 'block_items', []).map(b => b.block_id);
  let blocks = await block_store.get_blocks_by_id(list_blocks);
  let _blocks = _get(blocks, 'block_items', []).reverse();

  /**
   * Parsed data
   */
  let _chain_id = _get(chain_id, 'chain_id', '');
  let _chain_head = chain_head;

  return {
    props: {
      chain_id: _chain_id,
      chain_head: _chain_head,
      blocks: _blocks
    }
  }
}

export default index