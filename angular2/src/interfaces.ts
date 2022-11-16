export interface TextMaskConfig {
    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask}
     */
    readonly mask: TextMaskList | TextMaskListHandler | false

    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#guide}
     */
    readonly guide?: boolean

    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#placeholderchar}
     */
    readonly placeholderChar?: string

    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe}
     */
    readonly pipe?: TextMaskPipeHandler

    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#keepcharpositions}
     */
    readonly keepCharPositions?: boolean

    /**
     * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#showmask}
     */
    readonly showMask?: boolean
}

/**
 * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask-array}
 */
export type TextMaskList = ReadonlyArray<string | RegExp>;

/**
 * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask-function}
 */
export type TextMaskListHandler = (rawValue: string, config: TextMaskCurrentConfig) => TextMaskList | false;

/**
 * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe}
 */
export interface TextMaskCurrentConfig {
    readonly rawValue: string
    readonly previousConformedValue?: string
    readonly currentCaretPosition?: number
}

/**
 * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe}
 */
export type TextMaskPipeHandler = (
    conformedValue: string,
    config: TextMaskConfig & TextMaskCurrentConfig,
) => string | TextMaskPipeResult | false;

/**
 * {@link https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe}
 */
export interface TextMaskPipeResult {
    readonly value: string
    readonly indexesOfPipedChars?: ReadonlyArray<number>
}
