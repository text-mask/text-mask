import './styles.scss'
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MaskedInput from '../../react/src/reactTextMask'
import classnames from 'classnames'
import appStyles from './app.scss'
import choices from './choices'
import {Row, DemoTop, DemoBottom, OnOffSwitch} from './partials'
import {actionCreators, selectors} from './redux'
import HelpPanel from './helpPanel'

const selectRef = createRef()
const maskRef = createRef()

function isRegex(value) {
  return value.startsWith('/') && value.endsWith('/')
}

function stripRegexSlashes(value) {
  return value.slice(1, -1)
}

function convertStringRegex(value) {
  return new RegExp(stripRegexSlashes(value))
}

export default function App() {
  const maskedInputRef = useRef()
  const [controlledValue, setControlledValue] = useState('')

  const {
    value,
    name,
    placeholder,
    placeholderChar,
    pipe,
    keepCharPositions,
    mask: stringMask,
    guide,
    rejectionMessage,
    shouldFocusMaskedInput,
  } = useSelector((state) => state)

  const mask = useMemo(
    () => stringMask.map((s) => (isRegex(s) ? convertStringRegex(s) : s)),
    [stringMask]
  )

  const textMaskComponentStyle = useSelector(
    selectors.getTextMaskComponentStyle
  )
  const textMaskComponentUniqueKey = useSelector(
    selectors.getTextMaskComponentUniqueKey
  )
  const isMaskFunction = useSelector(selectors.isMaskFunction)

  const dispatch = useDispatch()
  const populateFromChoice = useCallback(
    (newValue) => dispatch(actionCreators.populateFromChoice(newValue)),
    [dispatch]
  )
  const setValue = useCallback(
    (newValue) => dispatch(actionCreators.setValue(newValue)),
    [dispatch]
  )
  const setKeepCharPositions = useCallback(
    (newValue) => dispatch(actionCreators.setKeepCharPositions(newValue)),
    [dispatch]
  )
  const setGuide = useCallback(
    (newValue) => dispatch(actionCreators.setGuide(newValue)),
    [dispatch]
  )
  const setPlaceholderChar = useCallback(
    (newValue) => dispatch(actionCreators.setPlaceholderChar(newValue)),
    [dispatch]
  )
  const setMask = useCallback(
    (newValue) => dispatch(actionCreators.setMask(newValue)),
    [dispatch]
  )

  const inputChange = useCallback(
    (ev) => setValue(ev.target.value),
    [setValue]
  )
  const selectChange = useCallback(
    (ev) => populateFromChoice(ev.target.value),
    [populateFromChoice]
  )
  const maskChange = useCallback((ev) => setMask(ev.target.value), [setMask])
  const placeholderCharChange = useCallback(
    (ev) => setPlaceholderChar(ev.target.value),
    [setPlaceholderChar]
  )

  useEffect(() => {
    if (shouldFocusMaskedInput) {
      maskedInputRef.current?.focus()
    }
  }, [shouldFocusMaskedInput])

  return (
    <div className={classnames(appStyles.mainContainer, 'container')}>
      <DemoTop />

      <div>
        <form className='form-horizontal'>
          <Row name='Masked input' value='maskedInput' noHelpLink>
            <MaskedInput
              value={value}
              style={textMaskComponentStyle}
              key={textMaskComponentUniqueKey}
              placeholder={placeholder}
              placeholderChar={placeholderChar}
              pipe={pipe}
              keepCharPositions={keepCharPositions}
              ref={maskedInputRef}
              mask={mask}
              guide={guide}
              onChange={inputChange}
              className='form-control'
              id='maskedInput'
            />
          </Row>

          {rejectionMessage && (
            <Row>
              <p className='alert alert-warning' style={{margin: 0}}>
                {rejectionMessage}
              </p>
            </Row>
          )}

          <Row name='Mask' value='mask'>
            <select
              className='form-control'
              value={name}
              onChange={selectChange}
              ref={selectRef}
            >
              {choices.map((choice, index) => (
                <option key={index} value={choice.name}>
                  {choice.name}
                </option>
              ))}
            </select>

            <input
              style={{
                display: isMaskFunction ? 'none' : null,
                marginTop: 12,
                fontFamily: 'monospace',
                cursor: 'default',
              }}
              ref={maskRef}
              type='text'
              disabled
              onChange={maskChange}
              value={convertMaskForDisplay(mask)}
              className='form-control'
              id='mask'
            />
          </Row>

          <HelpPanel />

          <Row name='Guide' value='guide' small>
            <OnOffSwitch name='guide' value={guide} onChange={setGuide} />
          </Row>

          <Row name='Keep character positions' value='keepcharpositions' small>
            <OnOffSwitch
              name='keepCharPositions'
              value={keepCharPositions}
              onChange={setKeepCharPositions}
            />
          </Row>

          <Row name='Placeholder character' value='placeholderchar'>
            <select
              id='placeholderChar'
              className='form-control'
              value={placeholderChar}
              onChange={placeholderCharChange}
            >
              <option value={'\u2000'}>\u2000 (white space)</option>
              <option value='_'>_ (underscore)</option>
            </select>
          </Row>

          <Row name='Controlled Test' value='controlledtest'>
            <input
              style={textMaskComponentStyle}
              type='text'
              value={controlledValue}
              onChange={(ev) => setControlledValue(ev.target.value)}
            ></input>
            <MaskedInput
              value={controlledValue}
              style={textMaskComponentStyle}
              key={textMaskComponentUniqueKey}
              placeholder={placeholder}
              placeholderChar={placeholderChar}
              pipe={pipe}
              keepCharPositions={keepCharPositions}
              ref={maskedInputRef}
              mask={mask}
              guide={guide}
              onChange={(ev) => setControlledValue(ev.target.value)}
              className='form-control'
              id='maskedInput'
            />
          </Row>
        </form>

        <hr />

        <DemoBottom />
      </div>
    </div>
  )
}

function convertMaskForDisplay(mask) {
  let displayMask = mask
    .map((element) => {
      return element[0] === '/' && element.length > 1 ?
        element :
        `'${element}'`
    })
    .join(', ')

  return `[${displayMask}]`
}
