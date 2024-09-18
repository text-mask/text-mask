export type MaskArray = (RegExp | string)[] | boolean;

export type MaskFunc = (rawValue: string) => MaskArray | boolean;

export type Mask = MaskArray | MaskFunc;
