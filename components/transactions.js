import Link from 'next/link';
import { get as _get } from 'lodash';
import { Card, ListGroup } from 'react-bootstrap';
import { VariableBlob, Str, Uint64 } from 'koinos-types2';

function Transactions(props) {
  let { value, type } = props.op;

  const create_card = (obj) => {
    if(typeof _get(obj, 'value') == 'string')
      return(`${_get(obj, 'name')}: ${ _get(obj, 'value').length > 50 ? _get(obj, 'value').substring(0, 48) + '...' : _get(obj, 'value') }`)
    if(typeof _get(obj, 'value') == 'object' && Object.keys(_get(obj, 'value')).length == 0)
      return (`${_get(obj, 'name')}: {}`)
    return (
      <Card>
        <Card.Header>
          <b> { _get(obj, 'name') } </b>
        </Card.Header>
        <ListGroup variant="flush">
          {
            Object.keys(_get(obj, 'value'))
            .map((v_key, key) => {
              var value_d = _get(obj, `value.${v_key}`, '');
              // stringify parsed
              if(typeof value_d == "object" && Object.keys(value_d).length == 0) {
                value_d = JSON.stringify(value_d)
              }
              // link render
              if(typeof value_d == "object" && value_d.link) {
                return (
                  <ListGroup.Item key={"list_op_"+key}>
                    <span> {v_key.replace(/_/g, ' ')}: </span>
                    <Link href={value_d.link}>
                      { value_d.value.length > 50 ? value_d.value.substring(0, 48) + '...' : value_d.value }
                    </Link>
                  </ListGroup.Item>
                )
              }
              // default render
              return (
                <ListGroup.Item key={"list_op_"+key}>
                  { v_key.replace(/_/g, ' ') }: { value_d.length > 50 ? value_d.substring(0, 48) + '...' : value_d }
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </Card>
    )
  }

  // operation values
  let _contract_id = _get(value, 'contract_id', '')
  let _entry_point = _get(value, 'entry_point', '')
  let _args        = _get(value, 'args', '')
  let _extensions  = _get(value, 'extensions', '')


  // set table
  let name_op = "args";
  let args_op = _args;

  if(type == 'koinos::protocol::call_contract_operation') {

    if(_contract_id == 'Mkw96mR+Hh71IWwJoT/2lJXBDl5Q=' && _entry_point == 1659871890) {
      let vb = new VariableBlob(_args)
      // args transfer
      let from   = Str.deserialize(vb).str
      let to     = Str.deserialize(vb).str
      let tokens = (parseInt(Uint64.deserialize(vb).num) / 100000000).toFixed(8) + ' tKOIN'
      name_op = "transfer"
      args_op = {
        from: {
          value: from,
          link: `/address/${from}`
        },
        to: {
          value: to,
          link: `/address/${to}`
        },
        value: tokens
      }
    }

    return (
      <Card>
        <Card.Header>
          <b> { type }  </b>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item key="contract_id">
            contract id: { _contract_id.length > 50 ? _contract_id.substring(0, 48) + '...' : _contract_id }
          </ListGroup.Item>
          <ListGroup.Item key="entry_point">
            entry point: { _entry_point.length > 50 ? _entry_point.substring(0, 48) + '...' : _entry_point }
          </ListGroup.Item>
          <ListGroup.Item key="args">
            { create_card({ name: name_op, value: args_op }) }
          </ListGroup.Item>
          <ListGroup.Item key="extensions">
            { create_card({ name: "extensions", value: _extensions }) }
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }


  return create_card({ name: type, value: value })
}

export default Transactions;
