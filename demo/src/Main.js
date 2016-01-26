import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {actionCreators} from './actions';
import Form from './form'
import _ from 'lodash'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Form/>

        <pre>
          {JSON.stringify(_.get(this, 'props.results'), null, 2)}
        </pre>
      </div>
    );
  }
}

export default connect((state) => ({ results: _.get(state, 'form.form.results') }))(Main)
