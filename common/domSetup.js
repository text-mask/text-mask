import './testSetup'
import {JSDOM} from 'jsdom'

global.document = new JSDOM(
  '<!doctype html><html><body></body></html>'
).window.document
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}
