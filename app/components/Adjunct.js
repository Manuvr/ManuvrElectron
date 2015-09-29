import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn } from 'lodash';

import SchemaMaster from './SchemaMaster';

import {Tab, Tabs} from 'material-ui/lib/tabs';
import Paper from 'material-ui/lib/paper'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/lib/card'
import IconButton from 'material-ui/lib/icon-button'

// Falling back to ES5 react for this.
// Couldn't get ES6 class recursion working... maybe it's babel or react-hotloader?

var Adjunct = React.createClass({

  getInitialState: function() {
    return { tabsValue: "z"};
  },

  layerCallback: function(object) {
    if(this.props.name) {
        object.target.unshift(this.props.name);
    }
    this.props.callback(object)
  },


  _handleTabsChange: function(val) {
    this.setState({tabsValue: val});
  },

  _handleButtonClick: function() {
    this.setState({tabsValue: ""});
  },

  render: function() {
    const { name, config, callback } = this.props;


    let schema = config.schema;
    let adjuncts = config.adjuncts;
    let layerCallback = this.layerCallback
    let state = this.state

    let compList = [];
    _forOwn(adjuncts, function(value, key) {
      compList.push(
          <Tab label={key} value={key}>
          <Adjunct
          key={key}
          name={key}
          config={value}
          callback={layerCallback}
          />
        </Tab>)
    })

    return (
      <div>
        <Card initiallyExpanded={true}>
          <CardHeader
            title={name}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            <SchemaMaster
              key="schema"
              schema={schema}
              callback={layerCallback} />

          </CardText>
          <CardText expandable={true}>
            <Tabs
              valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange.bind(this)}}>
              {compList}
            </Tabs>
          </CardText>

        </Card>


      </div>
    )
  }
})


export default Adjunct;
