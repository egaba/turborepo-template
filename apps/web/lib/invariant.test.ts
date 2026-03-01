import { invariant } from './invariant'

describe('invariant', () => {
  it('does not throw for truthy conditions', () => {
    expect(() => invariant(true, 'ok')).not.toThrow()
    expect(() => invariant('non-empty', 'ok')).not.toThrow()
    expect(() => invariant(1, 'ok')).not.toThrow()
    expect(() => invariant({}, 'ok')).not.toThrow()
  })

  it('throws for false', () => {
    expect(() => invariant(false, 'bad')).toThrow('Invariant violation: bad')
  })

  it('throws for null', () => {
    expect(() => invariant(null, 'was null')).toThrow('Invariant violation: was null')
  })

  it('throws for undefined', () => {
    expect(() => invariant(undefined, 'was undefined')).toThrow(
      'Invariant violation: was undefined',
    )
  })

  it('throws for empty string', () => {
    expect(() => invariant('', 'empty')).toThrow('Invariant violation: empty')
  })

  it('throws for zero', () => {
    expect(() => invariant(0, 'zero')).toThrow('Invariant violation: zero')
  })
})
