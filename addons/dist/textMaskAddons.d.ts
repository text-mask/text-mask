export interface NumberMaskConfig {
    prefix?: string;
    suffix?: string;
    includeThousandsSeparator?: boolean;
    thousandsSeparatorSymbol?: string;
    allowDecimal?: boolean;
    decimalSymbol?: string;
    decimalLimit?: number;
    integerLimit?: number;
    requireDecimal?: boolean;
    allowNegative?: boolean;
    allowLeadingZeroes?: boolean;
}

export function createAutoCorrectedDatePipe(a: any): any
export function createNumberMask(a: NumberMaskConfig): any
export const emailMask:any
