import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon, ListGroupItem, ListGroup } from 'react-bootstrap';
import { transform } from 'lodash';


class LeftWindow extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
    this.setMain = this.setMain.bind(this);
  }


  componentDidMount() {
  };

  setMain(setPath) {
    this.props.callback( {
      target: ["__local", "setMainWindow"],
      data: {
        path: setPath
      }
    })
  }

  render() {
    const { config, callback } = this.props;

    let setMain = this.setMain;

    // function to build out the "tree view"
    var adjTreeReduce = function(adjDef, path) {
      var tmp = [];
      for(var key in adjDef) {
        tmp.push({ text: key });
        tmp[tmp.length - 1].path = path.slice();
        tmp[tmp.length - 1].path.push(key)
        if(adjDef[key].hasOwnProperty("adjuncts") && Object.keys(adjDef[key].adjuncts).length > 0){
          tmp[tmp.length - 1].nodes = adjTreeReduce(adjDef[key].adjuncts, tmp[tmp.length - 1].path)
        }
      }
      return tmp
    };

    var treePush = function(arr) {
      var out = [];
      for(var x in arr) {
        // ELEMENTS
        out.push(<li key={x} onClick={setMain.bind(this, arr[x].path)}> { arr[x].text } </li>);
        if(arr[x].hasOwnProperty("nodes")){
            out.push(treePush(arr[x].nodes));
        }
      }
        // UL WRAPPERS
      return (<ul key={arr[0].text}> {out} </ul>);
    }

    var push2 = function(arr) {
      var out = [];
      out = arr.map(function(c, i, a){
        var tmp = [];
        if(c.hasOwnProperty("nodes")){
          tmp.push(push2(c.nodes))
        }
        return(
          <ListGroupItem key={c.text}>
            <h4 onClick={setMain.bind(this, c.path)}>{c.text}</h4>
            {tmp}
          </ListGroupItem>)
      })
      return(<ListGroup key={arr[0].text}> {out} </ListGroup>)
    }


    return (
      <div>
        { push2(adjTreeReduce(config.interface, [])) }
      </div>
    );
  }
}

export default LeftWindow;
