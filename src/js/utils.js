/**
 * Fill an array from a number, to a number, by the specified increment
 * @param {number} from
 * @param {number} to
 * @param {number} by
 */
export const fromToBy = (from, to, by) => {
  const result = []
  for (let i = from; i <= to; i += by) {
    result.push(i)
  }
  return result
}

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 */
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}
