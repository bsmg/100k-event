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

export class PooledRandomRange {
  /**
   * @param {number} min Lower Bound
   * @param {number} max Upper Bound
   * @param {number} [poolSize=2] Pool Size
   */
  constructor (min, max, poolSize = 2) {
    this.min = min
    this.max = max

    /**
     * @type {number[]}
     */
    this.pool = []
    this.poolSize = poolSize

    for (let i = 0; i < 2; i++) {
      this._generateRandom()
    }
  }

  async _generateRandom () {
    const rand = await randomRange(this.min, this.max, false)
    this.pool.push(rand)
  }

  generate () {
    const [rand, ...pool] = this.pool
    this.pool = pool

    if (this.pool.length < this.poolSize) this._generateRandom()
    return rand
  }
}

/**
 * Async Wait for MS
 * @param {number} ms Milliseconds
 * @returns {Promise.<void>}
 */
export const waitMS = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

/**
 * @param {number} x X Coordinate
 * @param {number} [seed] Random Seed
 * @returns {number}
 */
export const decelerate = (x, seed = 0.5) => Math.pow(Math.pow(10 * x, -1), 0.5) * seed
