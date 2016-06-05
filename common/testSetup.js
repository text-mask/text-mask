import chai from 'chai'
import sinon from 'sinon'
import isVerify from './isVerify.js'
import dynamicTests from 'mocha-dynamic-tests'
import _ from 'lodash'

global.expect = chai.expect
global.sinon = sinon
global.isVerify = isVerify
global.dynamicTests = dynamicTests
global._ = _
