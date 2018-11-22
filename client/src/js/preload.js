export const preload = src => {
  if (!document.images) return undefined

  const image = new Image()
  image.src = src

  console.log(`Preloading image ${src}`)
}

export const preloadAll = () => {
  const context = require.context('../images', true, /\.(png|jpe?g|svg)$/)
  const images = context.keys().map(context)
    .filter(x => !x.startsWith('data:'))

  for (const image of images) {
    preload(image)
  }
}

preloadAll()
