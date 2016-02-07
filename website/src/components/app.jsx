import React from 'react'
import _ from 'lodash'
import gettingStarted from '../markdowns/gettingStarted.md'
import whyStringPattern from '../markdowns/whyStringPattern.md'
import apiDocumentation from '../markdowns/apiDocumentation.md'
import Demo from './demo.jsx'
import style from './app.scss'
import classnames from 'classnames'

const App = React.createClass({
  render() {
    return (
      <span>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">string-pattern</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse navbar-right">
              <ul className="nav navbar-nav">
                <li><a href="#demo">Demo</a></li>
                <li><a href="#why">Why</a></li>
                <li><a href="#api-documentation">API</a></li>
                <li><a href="https://github.com/msafi/string-pattern/">GitHub</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className={classnames(style.mainContainer, 'container')}>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{__html: gettingStarted}}
          ></div>

          <hr/>

          <Demo/>

          <hr/>

          <div
            className="markdown"
            dangerouslySetInnerHTML={{__html: whyStringPattern}}
          ></div>

          <hr/>

          <div
            className="markdown"
            dangerouslySetInnerHTML={{__html: apiDocumentation}}
          ></div>
        </div>

        <footer className={style.footer}>
          <div className="container">
            <p className="text-muted">
              If you need help, please <a href="https://github.com/msafi/string-pattern/issues">file an issue.</a>
            </p>
          </div>
        </footer>
      </span>
    );
  }
})

export default App
