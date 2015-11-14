import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class Window extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
    this.toggleLog = this.toggleLog.bind(this);
    this.toggleTools = this.toggleTools.bind(this);
    this.globalPersist = this.globalPersist.bind(this);
    this.changeViewMode = this.changeViewMode.bind(this);
  }

  toggleLog() {
    // TODO: This ONLY works in Window, because we are the root
    //   of the interface_spec. Rework this in a manner that works everywhere.
    this.props.callback(
      {
        target: ['toggleLogWindow', 'window'],
        data: {}
      }
    )
  };

  toggleTools() {
    // TODO: This ONLY works in Window, because we are the root
    //   of the interface_spec. Rework this in a manner that works everywhere.
    this.props.callback(
      {
        target: ['toggleDevTools', 'window'],
        data: {}
      }
    )
  };

  globalPersist() {
    // TODO: Write this into window.
  };

  changeViewMode() {
    // TODO: This ONLY works in Window, because we are the root
    //   of the interface_spec. Rework this in a manner that works everywhere.
    this.props.callback(
      {
        target: ['__local', 'showHidden'],
        data: {
          value: !this.props.uiState.showHidden
        }
      }
    )
  };


  componentDidMount() {
  };

  handleChange(id, e) {
    e.preventDefault()
    let newArray = this.state.data.slice();
    newArray[id] = e.target.value
    this.setState({data: newArray})
  }

  render() {
    const { config, callback, uiState } = this.props;

    // TODO: Floppy-saved should reflect when the schema is dirty, and eligible for re-persisting (saving) the state.
    return (
        <ButtonGroup  >
        <Button onClick={this.globalPersist} bsSize="small"><Glyphicon glyph="floppy-saved" /></Button>

        <Button onClick={this.toggleLog} bsSize="small"><Glyphicon glyph="info-sign" />  {(config.outputs.loggerWindowOpen.value) ? 'Close' : 'Open'} Log</Button>

        <Button onClick={this.toggleTools} bsSize="small"><Glyphicon glyph="wrench" />  {(config.outputs.devToolsOpen.value) ? 'Close' : 'Open'} Tools</Button>

        <Button onClick={this.changeViewMode} bsSize="small"><Glyphicon glyph="cog" />  {(uiState.showHidden) ? 'Hide' : 'Show'} hidden</Button>
        </ButtonGroup>
    );
    //return (
    //  <div>
    //    <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
    //      <NavItem><Glyphicon glyph="floppy-saved" /></NavItem>
    //      <NavItem><Glyphicon glyph="cog" />  Open Log</NavItem>
    //      <NavItem><Glyphicon glyph="wrench" />  Open Tools</NavItem>
    //    </Nav>
    //  </div>
    //);
  }
}

export default Window;
