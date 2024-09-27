import React, { ReactNode } from 'react';
import { Mask } from '../../types/Mask.js';
import createTextMaskInputElement from '../../core/createTextMaskInputElement.js';
import { Pipe } from '../../types/Pipe.js';
import { isNil } from '../../utils/helpers.js';
import { TextMaskInputElementResult } from '../../types/TextMaskInputElement.js';

type ComponentProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: Mask;
  type?: 'text' | 'tel' | 'url' | 'password' | 'search';
  guide?: boolean;
  value?: string;
  defaultValue?: string;
  pipe?: Pipe;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
};

type Props = ComponentProps & {
  render?: (ref: (inputElement: HTMLInputElement) => void, props: ComponentProps) => ReactNode;
};

type State = {};

export class MaskedInput extends React.PureComponent<Props, State> {
  inputElement: HTMLInputElement | undefined;
  textMaskInputElement: TextMaskInputElementResult | undefined;

  static defaultProps: Props = {
    mask: [],
    render: (ref, props) => <input ref={ref} {...props} />,
    type: 'text',
  };

  constructor(props: Props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setRef(inputElement: HTMLInputElement) {
    this.inputElement = inputElement;
  }

  componentDidMount() {
    this.initTextMask();
  }

  componentDidUpdate(prevProps: Props) {
    // Getting props affecting value
    const { value, pipe, mask, guide, placeholderChar, showMask } = this.props;

    // Calculate that settings was changed:
    // - `pipe` converting to string, to compare function content
    // - `mask` converting to string, to compare values or function content
    // - `keepCharPositions` excludes, because it affect only cursor position
    const settings: { [key: string]: boolean | string | undefined } = {
      guide,
      placeholderChar,
      showMask,
    };
    const isPipeChanged =
      typeof pipe === 'function' && typeof prevProps.pipe === 'function'
        ? pipe.toString() !== prevProps.pipe.toString()
        : (isNil(pipe) && !isNil(prevProps.pipe)) || (!isNil(pipe) && isNil(prevProps.pipe));
    const isMaskChanged = mask.toString() !== prevProps.mask.toString();
    const isSettingChanged =
      Object.keys(settings).some(
        (key) => settings[key] !== (prevProps as { [key: string]: any })[key],
      ) ||
      isMaskChanged ||
      isPipeChanged;

    // Calculate that value was that changed
    const isValueChanged = value !== this.inputElement?.value;

    // Check value and settings to prevent duplicating update() call
    if (isValueChanged || isSettingChanged) {
      this.initTextMask();
    }
  }

  initTextMask() {
    const {
      props,
      props: { value },
    } = this;

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.inputElement,
      ...props,
    });
    this.textMaskInputElement.update(value);
  }

  onChange(event: React.ChangeEvent) {
    this.textMaskInputElement?.update();

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  }

  onBlur(event: React.FocusEvent) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }
  }

  render() {
    const {
      render = (ref, props) => <input ref={ref} {...props} />,
      mask,
      guide,
      pipe,
      placeholderChar,
      keepCharPositions,
      value,
      showMask,
      onChange,
      onBlur,
      ...rest
    } = this.props;

    return render(this.setRef, {
      mask,
      onBlur: this.onBlur,
      onChange: this.onChange,
      defaultValue: this.props.value,
      ...rest,
    });
  }
}

MaskedInput.defaultProps = {
  mask: [],
  render: (ref, props) => <input ref={ref} {...props} />,
  type: 'text',
};

export { default as conformToMask } from '../../core/conformToMask.js';
