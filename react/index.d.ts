type Array = Array<string | RegExp>;

declare module "react-text-mask" {

  interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement {
    mask?: maskArray | ((input: HTMLInputElement) => maskArray);

    guide?: boolean;

    placeholderChar?: string;

    keepCharPositions?: boolean;

    pipe?: (conformedValue: string, config: any) => false | string | { value: string, indexesOfPipedChars: number[] };

    onReject?: (infos: { conformedValue: string, maskRejection: boolean, pipeRejection: boolean }) => void;

    onAccept?: () => void;
  }

  interface conformToMaskResult {
    conformedValue: string
    meta: {
      someCharsRejected: boolean
    }
  }

  export class MaskedInput extends React.Component<MaskedInputProps, any> {}

  export const conformToMask: (text: string, mask: maskArray, config: any) => conformToMaskResult;

  export default MaskedInput;
}

declare module "text-mask-addons/dist/createNumberMask" {

  const createNumberMask: (config: {
    prefix?: string,
    suffix?: string,
    includeThousandsSeparator?: boolean,
    thousandsSeparatorSymbol?: string,
    allowDecimal?: boolean,
    decimalSymbol?: string,
    decimalLimit?: number,
    integerLimit?: number,
    requireDecimal?: boolean,
    allowNegative?: boolean
  }) => maskArray

  export default createNumberMask;
}
maskArray = Array<string | RegExp>;

declare module "react-text-mask" {

  interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement {
    mask?: maskArray | ((input: HTMLInputElement) => maskArray);

    guide?: boolean;

    placeholderChar?: string;

    keepCharPositions?: boolean;

    pipe?: (conformedValue: string, config: any) => false | string | { value: string, indexesOfPipedChars: number[] };

    onReject?: (infos: { conformedValue: string, maskRejection: boolean, pipeRejection: boolean }) => void;

    onAccept?: () => void;
  }

  interface conformToMaskResult {
    conformedValue: string
    meta: {
      someCharsRejected: boolean
    }
  }

  export class MaskedInput extends React.Component<MaskedInputProps, any> {}

  export const conformToMask: (text: string, mask: maskArray, config: any) => conformToMaskResult;

  export default MaskedInput;
}

declare module "text-mask-addons/dist/createNumberMask" {

  const createNumberMask: (config: {
    prefix?: string,
    suffix?: string,
    includeThousandsSeparator?: boolean,
    thousandsSeparatorSymbol?: string,
    allowDecimal?: boolean,
    decimalSymbol?: string,
    decimalLimit?: number,
    integerLimit?: number,
    requireDecimal?: boolean,
    allowNegative?: boolean
  }) => maskArray

  export default createNumberMask;
}
