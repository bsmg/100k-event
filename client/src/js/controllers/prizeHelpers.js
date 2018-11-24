// Banners
import viveProHTC from '../../images/prizes/vive-pro-htc.png'
import viveProVRFI from '../../images/prizes/vive-pro-vrfi.png'
import viveProPlutovr from '../../images/prizes/vive-pro-plutovr.png'
import placeholder from '../../images/prizes/placeholder.png'
import bsmg from '../../images/logo-banner.png'

// Prize Packs
import blank from '../../images/prize-packs/blank.png'
import proRegular from '../../images/prize-packs/prizepack-pro-regular.png'

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

export const packToImage = pack => {
  switch (pack) {
    case 'pro-regular':
      return proRegular
    default:
      return blank
  }
}
