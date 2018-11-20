// Images
import viveProHTC from '../../images/prizes/vive-pro-htc.png'
import viveProVRFI from '../../images/prizes/vive-pro-vrfi.png'
import viveProPlutovr from '../../images/prizes/vive-pro-plutovr.png'
import placeholder from '../../images/prizes/placeholder.png'
import bsmg from '../../images/logo.png'

/**
 * @param {any[]} array Array
 * @returns {number}
 */
export const randomIndex = array => Math.floor(Math.random() * array.length)

/**
 * @param {number} min Lower Bound
 * @param {number} max Upper Bound
 * @param {boolean} [bad] Upper Bound
 * @returns {number}
 */
export const randomRange = async (min, max, bad) => {
  if (bad) return Math.floor((Math.random() * (max - min + 1)) + min)

  const resp = await fetch(`https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`)
  return parseInt(await resp.text(), 10)
}

/**
 * Async Wait for MS
 * @param {number} ms Milliseconds
 * @returns {Promise.<void>}
 */
export const waitMS = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

/**
 * @param {string} prize Price Image
 * @returns {string}
 */
export const prizeToImage = prize => {
  switch (prize) {
    case 'vive-pro-htc':
      return `url(${viveProHTC})`
    case 'vive-pro-vrfi':
      return `url(${viveProVRFI})`
    case 'vive-pro-plutovr':
      return `url(${viveProPlutovr})`
    case 'bsmg':
      return `url(${bsmg})`
    default:
      return `url(${placeholder})`
  }
}

/**
 * @param {number} x X Coordinate
 * @param {number} [seed] Random Seed
 * @returns {number}
 */
export const decelerate = (x, seed = 0.5) => Math.pow(Math.pow(10 * x, -1), 0.5) * seed

