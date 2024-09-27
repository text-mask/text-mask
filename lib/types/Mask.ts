import { Pipe } from './Pipe';

export type MaskArray = (RegExp | string)[] | boolean;

export type MaskFunc = (rawValue: string) => MaskArray | boolean;

export type MaskObject = {
  mask: MaskArray | MaskFunc;
  pipe: Pipe;
};

export type Mask = MaskArray | MaskFunc | MaskObject;
