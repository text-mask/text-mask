import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {actionCreators} from './actions';
import Form from './form'
import _ from 'lodash'

const Main = React.createClass({
  propTypes: {
    results: PropTypes.any.isRequired
  },

  render() {
    const actions = bindActionCreators(actionCreators, this.props.dispatch)

    return (
      <div>
        <Form
          updateValue={actions.updateResults}
          setCaretPosition={actions.setCaretPosition}
          caretPosition={this.props.caretPosition}
          value={this.props.results}
        />

        <pre>
          {JSON.stringify(_.get(this, 'props.results'), null, 2)}
        </pre>
      </div>
    );
  }
})

export default connect((state) => _.get(state, 'main'))(Main)
