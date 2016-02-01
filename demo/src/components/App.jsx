import React from 'react'
import Form from './Form.jsx'
import _ from 'lodash'
import gettingStarted from '../markdowns/gettingStarted.md'
import whyStringPattern from '../markdowns/whyStringPattern.md'
import apiDocumentation from '../markdowns/apiDocumentation.md'
import Demo from './demo.jsx'

const App = React.createClass({
  render() {
    return (
      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation">
                <a href="https://github.com/msafi/string-pattern/">Getting started</a>
              </li>
              <li role="presentation">
                <a href="https://github.com/msafi/string-pattern/">Demo</a>
              </li>
              <li role="presentation">
                <a href="https://github.com/msafi/string-pattern/">Why</a>
              </li>
              <li role="presentation">
                <a href="https://github.com/msafi/string-pattern/">API</a>
              </li>
              <li role="presentation">
                <a href="https://github.com/msafi/string-pattern/">GitHub</a>
              </li>
            </ul>
          </nav>
          <h3 className="text-muted">string-pattern</h3>
        </div>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{__html: gettingStarted}}
        ></div>

        <Demo/>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{__html: whyStringPattern}}
        ></div>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{__html: apiDocumentation}}
        ></div>
      </div>
    );
  }
})

export default App
