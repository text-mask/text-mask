import React from 'react'
import Demo from './demo.jsx'
import style from './app.scss'
import NavBar from './navBar.jsx'
import classnames from 'classnames'

const App = React.createClass({
  render() {
    return (
      <div>
        <div className={classnames(style.mainContainer, 'container')}>
          <Demo/>
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

export default App
