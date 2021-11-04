import Head from 'next/head';
import { Card, Row, Col, Table, ListGroup } from 'react-bootstrap';
import { get as _get } from 'lodash';

// utils
import bs58 from 'bs58';
import { encodeBase64 }  from '@/utils/parsed';

// Blockchain
import TokenContract from '@/proto/koinos/contracts/token/token_pb';
import PBChain from '@/proto/koinos/chain/chain_pb';

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
                    <td> { _get(props, 'balance', 0).toFixed(6) } TKOIN </td>
                  </tr>

                  <tr>
                    <td> Mana </td>
                    <td> { _get(props, 'mana', 0).toFixed(6) } Mana </td>
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
  const { address_id } = params;
  const KoinContractID = "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ";
  
  // balance koin address request
  let balArg = new TokenContract.balance_of_arguments()
  balArg.setOwner( bs58.decode(address_id) )
  let balData = balArg.serializeBinary()
  let _balance = await chain.get_contract(
    KoinContractID,
    0x15619248,
    encodeBase64(balData)
  )
  let balRes = TokenContract.balance_of_result.deserializeBinary(_balance.result);
  let balance = balRes.getValue();


  // balance mana address request
  const manaArg = new PBChain.get_account_rc_arguments();
  manaArg.setAccount( bs58.decode(address_id) )
  let manaData = balArg.serializeBinary()
  let _mana = await chain.get_contract(
    KoinContractID,
    0,
    encodeBase64(manaData)
  )
  let manaRes = PBChain.get_account_rc_result.deserializeBinary(_mana.result);
  let mana = manaRes.getValue();


  
  return {
    props: {
      address: address_id,
      balance: parseInt( balance )/100000000,
      mana:    parseInt( mana )/100000000,
    }
  }
}

export default index