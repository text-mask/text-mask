import { Mask } from './Mask';
import { Pipe } from './Pipe';

export type MainConfig = {
  mask: Mask;
  guide?: boolean; // Default is true
  placeholderChar?: string; // Default is '_'(underscore)
  keepCharPositions?: boolean; // Default is false
  pipe?: Pipe;
  showMask?: boolean; // Default is true

  inputElement?: HTMLInputElement;
  currentCaretPosition?: number | null;
  rawValue?: string;
  previousConformedValue?: string;
  placeholder?: string;
};

export type ConformMaskConfig = {
  guide?: boolean; // Default is true
  previousConformedValue?: string;
  placeholderChar?: string; // Default is '_'(underscore)

  // Not documented
  placeholder?: string;
  currentCaretPosition?: number | null;
  keepCharPositions: boolean;
};
