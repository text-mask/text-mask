import React from 'react'
import gettingStarted from '../markdowns/gettingStarted.md'
import whyTextMask from '../markdowns/whyTextMask.md'
import Demo from './demo.jsx'
import style from './app.scss'
import classnames from 'classnames'
import NavBar from './navBar.jsx'
import ReactGettingStarted from './react.gettingStarted.jsx'
import CoreGettingStarted from './core.gettingStarted.jsx'
import VanillaGettingStarted from './vanilla.gettingStarted.jsx'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <NavBar/>

        <div className={classnames(style.mainContainer, 'container')}>
          {this.props.children}
        </div>

        <footer className={style.footer}>
          <div className="container">
            <p className="text-muted">
              If you need help, please <a href="https://github.com/msafi/text-mask/issues">file
              an issue.</a>
            </p>
          </div>
        </footer>
      </div>
    )
  }
})

const Homepage = React.createClass({
  render() {
    return (
      <span>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{__html: gettingStarted}}
        ></div>

        <hr/>

        <Demo/>

        <hr/>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{__html: whyTextMask}}
        ></div>
      </span>
    );
  }
})

const AppWithRoutes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Homepage}/>
          <Route path="/react" component={ReactGettingStarted}/>
          <Route path="/core" component={CoreGettingStarted}/>
          <Route path="/vanilla" component={VanillaGettingStarted}/>
        </Route>
      </Router>
    )
  }
})

export default AppWithRoutes
