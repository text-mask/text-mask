// createAutoCorrectedDatePipe.ts
export const MaxValueMonth: number[] = [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const FormatOrder: string[] = ['yyyy', 'yy', 'mm', 'dd', 'HH', 'MM', 'SS'];

// STRINGS
export const DollarSign = '$';
export const EmptyString = '';
export const Comma = ',';
export const Period = '.';
export const Minus = '-';
export const NumberString = 'number';
export const AtSymbol = '@';
export const CaretTrap: string = '[]';
export const AtDot = '@.';
export const Dot = '.';
export const DotDot = '..';
export const Asterisk = '*';
export const Space = ' ';
export const G = 'g';
export const PlaceholderChar = '_';
export const StrFunction = 'function';
export const StrObject = 'object';
export const StrNone = 'none';

// REGEX
export const MinusRegExp = /-/;
export const NonDigitsRegExp = /\D+/g;
export const DigitRegExp = /\d/;
export const AllAtSymbolsRegExp = /@/g;
export const AllDotsRegExp = /\./g;
export const AnyNonWhitespaceRegExp = /[^\s]/;
export const AnyNonDotOrWhitespaceRegExp = /[^.\s]/;
export const AllWhitespaceRegExp = /\s/g;

// OTHER
export const EmptyArray = [];
export const IsAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
export const Defer =
  typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;
