// Images
import viveProHTC from '../../images/prizes/vive-pro-htc.png'
import viveProVRFI from '../../images/prizes/vive-pro-vrfi.png'
import viveProPlutovr from '../../images/prizes/vive-pro-plutovr.png'
import placeholder from '../../images/prizes/placeholder.png'

/**
 * @param {any[]} array Array
 * @returns {number}
 */
export const randomIndex = array => Math.floor(Math.random() * array.length)

/**
 * @param {number} min Lower Bound
 * @param {number} max Upper Bound
 * @returns {number}
 */
export const randomRange = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min)

/**
 * Async Wait for MS
 * @param {number} ms Milliseconds
 * @returns {Promise.<void>}
 */
export const waitMS = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

export const prizeToImage = prize => {
  switch (prize) {
    case 'vive-pro-htc':
      return `url(${viveProHTC})`
    case 'vive-pro-vrfi':
      return `url(${viveProVRFI})`
    case 'vive-pro-plutovr':
      return `url(${viveProPlutovr})`
    default:
      return `url(${placeholder})`
  }
}

export const decelerate = (x, seed = 0.5) => Math.pow(Math.pow(10 * x, -1), 0.5) * seed

export const createCurve = () => {
  const input = [
    { ms: 50, multiplier: randomRange(55, 65) },
    { ms: 100, multiplier: randomRange(12, 18) },
    { ms: 200, multiplier: randomRange(6, 10) },
    { ms: 500, multiplier: randomRange(3, 5) },
    { ms: 1000, multiplier: randomRange(2, 4) },
  ]

  const final = []
  for (const { ms, multiplier } of input) {
    for (let i = 0; i < multiplier; i++) {
      final.push(ms)
    }
  }

  return final
}
