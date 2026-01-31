import { describe, it, expect } from 'vitest'
import { extractNonFunctionProperties } from '../../../src/runtime/app/utils/extract-props'

describe('extractNonFunctionProperties', () => {
  it('should extract only non-function properties', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: () => { },
      e: function () { },
      f: { nested: 1 },
    }
    const result = extractNonFunctionProperties(obj)
    expect(result).toEqual({
      a: 1,
      b: 'string',
      c: true,
      f: { nested: 1 },
    })
  })

  it('should handle empty object', () => {
    expect(extractNonFunctionProperties({})).toEqual({})
  })

  it('should handle object with only functions', () => {
    const obj = {
      a: () => { },
      b: () => { },
    }
    expect(extractNonFunctionProperties(obj)).toEqual({})
  })
})
