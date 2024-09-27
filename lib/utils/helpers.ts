import { Mask, MaskArray, MaskFunc, MaskObject } from '../types/Mask';
import { Pipe, PipeResult, PipeResultObject } from '../types/Pipe';
import { CaretTrap, EmptyArray, PlaceholderChar } from './constants';

export function convertMaskToPlaceholder(
  mask: Mask = EmptyArray,
  placeholderChar = PlaceholderChar,
) {
  if (!isArray(mask) || typeof mask === 'boolean' || isMaskFunction(mask) || isMaskObject(mask)) {
    throw new Error('Text-mask: convertMaskToPlaceholder: The mask property must be an array.');
  }

  if (isArray(mask) && mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Text-mask: convertMaskToPlaceholder: Placeholder character must not be used as part of the mask. Please specify a character ' +
        'that is not present in your mask as your placeholder character.\n\n' +
        `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
        `The mask that was received is: ${JSON.stringify(mask)}`,
    );
  }

  return mask
    .map((char: any) => {
      return char instanceof RegExp ? placeholderChar : char;
    })
    .join('');
}

export function processCaretTraps(mask: Mask) {
  const indexes = [];

  if (!isArray(mask) || typeof mask === 'boolean' || isMaskFunction(mask) || isMaskObject(mask)) {
    throw new Error('Text-mask: processCaretTraps: The mask property must be an array.');
  }

  let indexOfCaretTrap;
  while (((indexOfCaretTrap = mask.indexOf(CaretTrap)), indexOfCaretTrap !== -1)) {
    indexes.push(indexOfCaretTrap);

    mask.splice(indexOfCaretTrap, 1);
  }

  return { maskWithoutCaretTraps: mask, indexes };
}

export function isArray(value: any): boolean {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}

export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}

export function isNil(value: any): boolean {
  return typeof value === 'undefined' || value === null;
}

export function isMaskFunction(mask: Mask): mask is MaskFunc {
  return (mask as MaskFunc) !== undefined && typeof mask === 'function';
}

export function isMaskArray(mask: Mask): mask is MaskArray {
  return typeof mask === 'object' && !('call' in mask);
}

export function isMaskObject(mask: Mask): mask is MaskObject {
  return (mask as MaskObject) && typeof mask === 'object' && 'mask' in mask && 'pipe' in mask;
}

export function isPipeFunction(pipe?: Pipe): pipe is Pipe {
  return (pipe as Pipe) !== undefined && typeof pipe === 'function';
}

export function isPipeResultsBoolean(pipeResults: PipeResult): pipeResults is boolean {
  return (pipeResults as boolean) !== undefined;
}

export function isPipeResultsString(pipeResults: PipeResult): pipeResults is string {
  return (pipeResults as string) !== undefined;
}

export function isPipeResultsObject(pipeResults: PipeResult): pipeResults is PipeResultObject {
  return (pipeResults as PipeResultObject) !== undefined;
}
