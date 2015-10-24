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
    return { tabsValue: "none"};
  },

  layerCallback: function(object) {
    if(this.props.name) {
        object.target.push(this.props.name);
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

    let title = (<h1>{name}</h1>)
    let tabHead = (<div />)

    if (adjuncts !== undefined && Object.keys(adjuncts).length > 0) {
      _forOwn(adjuncts, function(value, key) {
        compList.push(
          <Tab key={key + "a"} label={key} value={key}>
            <Adjunct key={key} name={key} config={value} callback={layerCallback} />
          </Tab>)
      });
      tabHead = (<Tabs valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange}}><Tab key="wut" label="--hide adjuncts--" value="none"></Tab>{compList}</Tabs>);
    }

    // if(compList.length > 0) {
    //   tabHead = (<CardText expandable={true}><Tabs valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange}}>);
    //   tabBot = (</Tabs></CardText>)
    // }
    return (
      <div>
        <Card initiallyExpanded={true}>
          <CardHeader
            avatar={title}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            <SchemaMaster
              key="schema"
              schema={schema}
              callback={layerCallback} />
          </CardText>

          <CardText expandable={true}>
          {tabHead}
          </CardText>

        </Card>
      </div>
    )
  }
})


export default Adjunct;
