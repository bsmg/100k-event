// Banners
import viveProHTC from '../../images/prizes/vive-pro-htc.png'
import viveProVRFI from '../../images/prizes/vive-pro-vrfi.png'
import viveProPlutovr from '../../images/prizes/vive-pro-plutovr.png'
import placeholder from '../../images/prizes/placeholder.png'
import hoodie from '../../images/prizes/prize-hoodie.png'
import shirt from '../../images/prizes/prize-tshirt.png'
import bsmg from '../../images/logo-banner.png'

// Prize Packs
import blank from '../../images/prize-packs/blank.png'
import hundoDollar1 from '../../images/prize-packs/prizepack-100-dollar-1.png'
import hundoDollar2 from '../../images/prize-packs/prizepack-100-dollar-2.png'
import chefs from '../../images/prize-packs/prizepack-chefs.png'
import holoDance from '../../images/prize-packs/prizepack-holodance.png'
import hoodie1 from '../../images/prize-packs/prizepack-hoodie-1.png'
import proRegular from '../../images/prize-packs/prizepack-pro-regular.png'
import proWireless from '../../images/prize-packs/prizepack-pro-wireless.png'

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
    case 'hoodie':
      return `url(${hoodie})`
    case 'shirt':
      return `url(${shirt})`
    default:
      return `url(${placeholder})`
  }
}

export const packToImage = pack => {
  switch (pack) {
    case '100-dollar-1':
      return hundoDollar1
    case '100-dollar-2':
      return hundoDollar2
    case 'chefs':
      return chefs
    case 'holodance':
      return holoDance
    case 'hoodie-1':
      return hoodie1
    case 'pro-regular':
      return proRegular
    case 'pro-wireless':
      return proWireless
    default:
      return blank
  }
}
