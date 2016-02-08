import React from 'react'
import reactReadMe from '../../../integrations/react/README.md'
import classnames from 'classnames'

const ReactGettingStarted = React.createClass({
  render() {
    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{__html: reactReadMe}}
      ></div>
    );
  }
})

export default ReactGettingStarted
