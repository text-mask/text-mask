import React from 'react'
import angular2ReadMe from '../../../integrations/angular2/README.md'

const Angular2GettingStarted = React.createClass({
  render() {
    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{__html: angular2ReadMe}}
      ></div>
    );
  }
})

export default Angular2GettingStarted
