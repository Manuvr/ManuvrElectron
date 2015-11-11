import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';
import { transform } from 'lodash';


class LeftWindow extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
  }


  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;

    // function to build out the "tree view"
    var adjTreeReduce = function(adjDef) {
      var tmp = [];
      for(var key in adjDef) {
        tmp.push({ text: key })
        if(adjDef[key].hasOwnProperty("adjuncts") && Object.keys(adjDef[key].adjuncts).length > 0){
          tmp[tmp.length - 1].nodes = adjTreeReduce(adjDef[key].adjuncts)
        }
      }
      return tmp
    };

    var treePush = function(arr) {
      var out = [];
      for(var x in arr) {
        out.push(<li key={x}>{arr[x].text}</li>);
        if(arr[x].hasOwnProperty("nodes")){
            out.push(treePush(arr[x].nodes));
        }
      }
      return (<ul key={arr[0].text}> {out} </ul>);
    }

    return (
      <div>
        Left Window! <br />
        { treePush(adjTreeReduce(config.interface)) }
      </div>
    );
  }
}

export default LeftWindow;
