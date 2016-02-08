import React from 'react'
import navBarStyles from './navBar.scss'

export default function NavBar() {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="pull-left">
          <a className="navbar-brand" href="#">Text Mask</a>
        </div>

        <div id="navbar" className="pull-right">
          <ul className="nav navbar-nav">
            {/*<li className="dropdown" className={navBarStyles.li}>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">Getting started <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>*/}

            <li className={navBarStyles.li}>
              <a href="https://github.com/msafi/text-mask/">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
