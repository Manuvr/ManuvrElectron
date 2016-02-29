import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon, ListGroupItem, ListGroup }
  from 'react-bootstrap';
import {  get as _get } from 'lodash';

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

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
        if(config.uiState.showHidden || _get(adjDef[key], ["hidden"]) !== true) {
          tmp.push({ text: key });
          tmp[tmp.length - 1].path = path.slice();
          tmp[tmp.length - 1].path.push(key)
          if(adjDef[key].hasOwnProperty("adjuncts") && Object.keys(adjDef[key].adjuncts).length > 0){
            tmp[tmp.length - 1].nodes = adjTreeReduce(adjDef[key].adjuncts, tmp[tmp.length - 1].path)
          }
        }
      }
      return tmp
    };

    const treePush = function(arr, pass) {
      pass = pass === undefined ? [] : pass;
      let out = [];
      out = arr.map(function(c, i, a){
        let tmp = [];
        let myPass = pass.concat([c.text])
        let style = { backgroundColor: "white", color: "black", padding: 4, topMargin: 1, bottomMargin: 1, borderColor: "Grey" }
        style.backgroundColor = arraysEqual(myPass, config.uiState.mainWindow) === true ? "LightGreen" : "LightGrey";
        if(c.hasOwnProperty("nodes")){
          tmp.push(treePush(c.nodes, myPass.slice()))
        }
        return(
          <ListGroupItem key={c.text} style={style}>
            <h5 onClick={setMain.bind(this, c.path)}>{c.text}</h5>
            {tmp}
          </ListGroupItem>)
      })
      return(<ListGroup key={arr}> {out} </ListGroup>)
    }


    return (
      <div style={{"height" : "100%"}}>
        { treePush(adjTreeReduce(config.interface, [])) }
      </div>
    );
  }
}

export default LeftWindow;
