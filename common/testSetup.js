/* eslint-disable no-extend-native */

import chai from 'chai'
import sinon from 'sinon'
import isVerify from './isVerify.js'
import dynamicTests from 'mocha-dynamic-tests'
import _ from 'lodash'

console.clear = () => null // eslint-disable-line

RegExp.prototype.toJSON = function() {
  return this.source
}

global.getLineNumber = function() {
  const err = new Error()
  const stack = err['stack']
  const stackLines = stack.split('\n')
  const calleeLine = stackLines[2]
  const lineNumber = calleeLine.match(/\(.+:(\d+):\d+\)/)[1]

  return lineNumber
}

global.expect = chai.expect
global.sinon = sinon
global.isVerify = isVerify
global.dynamicTests = dynamicTests
global._ = _
