import React from 'react'
import coreReadMe from '../../../core/README.md'

const CoreGettingStarted = React.createClass({
  render() {
    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{__html: coreReadMe}}
      ></div>
    );
  }
})

export default CoreGettingStarted
