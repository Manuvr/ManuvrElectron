import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn } from 'lodash';

import SchemaMaster from './SchemaMaster';
// **** Class recursion wasn't working, so I switched back to ES5 style ***
//
// class Adjunct extends Component {
//
//   constructor() {
//     super();
//     this.layerCallback = this.layerCallback.bind(this);
//     this.render = this.render.bind(this);
//     this.Adjunct = this;
//   }
//
//   layerCallback(object) {
//     object.unshift(this.props.name);
//     this.props.callback(object)
//   }
//
//   render() {
//     const { name, config, callback } = this.props;
//
//     let Row = Elemental.Row
//     let Col = Elemental.Col
//
//     let compList = [];
//     let schema = config.schema;
//     let adjuncts = config.adjuncts;
//
//     let Adjunct = this.Adjunct;
//
//     _forOwn(adjuncts, function(value, key) {
//       compList.push(<Adjunt name={key} config={value} callback={layerCallback}/>);
//     })
//
//     return (
//       <div>
//         {name}
//         <Schema schema={schema} callback={layerCallback} />
//         {compList}
//       </div>
//     )
//   }
// }

var Adjunct = React.createClass({

  layerCallback: function(object) {
    object.unshift(this.props.name);
    this.props.callback(object)
  },

  render: function() {
    const { name, config, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col

    let compList = [];
    let schema = config.schema;
    let adjuncts = config.adjuncts;
    let layerCallback = this.layerCallback

    _forOwn(adjuncts, function(value, key) {
      compList.push(<li><Adjunct name={key} config={value} callback={layerCallback}/></li>);
    })

    return (
      <div>
        {name}<br/>
        Schema:<SchemaMaster schema={schema} callback={layerCallback} />
        Adjuncts:<ul>{compList}</ul>
      </div>
    )
  }
})


export default Adjunct;
