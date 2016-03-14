import React from 'react'
import vanillaReadMe from '../../../integrations/vanilla/README.md'

const VanillaGettingStarted = React.createClass({
  render() {
    return (
      <div
        style={{overflowX: 'scroll'}}
        className="markdown"
        dangerouslySetInnerHTML={{__html: vanillaReadMe}}
      ></div>
    );
  }
})

export default VanillaGettingStarted
