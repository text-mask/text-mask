import { MainConfig } from './Config';

export type PipeResultObject = {
  value?: string;
  indexesOfPipedChars?: number[];
  rejected?: boolean;
};

export type PipeResult = PipeResultObject | boolean | string;

export type Pipe = (conformedValue: string, config: MainConfig) => PipeResult;
