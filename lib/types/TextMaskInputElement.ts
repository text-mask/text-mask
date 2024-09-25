import { MainConfig } from './Config';

export type TextMaskInputElementResult = {
  state: {
    previousConformedValue: string;
    previousPlaceholder: string;
  };
  update(rawValue?: string, config?: MainConfig): void;
};
