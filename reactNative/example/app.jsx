import React from 'react'
import MaskedInput from '../src/reactTextMask'
import {Text, View} from 'react-native'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <View>
        <Text>Phone Number</Text>
        <Text>{this.state.value}</Text>
        <MaskedInput
          onChange={(e) => this.setState({value: e.nativeEvent.text})}
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          guide={false}
          value={this.state.value}
        />
      </View>
    )
  }
}

export default Example
