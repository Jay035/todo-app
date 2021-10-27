const plugin = require('tailwindcss/plugin')

const pseudoElementVariants = plugin(function ({
  addComponents,
  addVariant,
  e,
}) {
  const elements = ['before', 'after']

  for (const element of elements) {
    addComponents({
      [`.${e(`${element}-content`)}::${element}`]: {
        content: `attr(data-content-${element})`,
      },
    })

    for (const inset of ['inset-0', 'inset-x-0', 'inset-y-0']) {
      addComponents({
        [`.${e(`${element}-${inset}`)}`]: {
          position: 'relative',
        },
      })
    }

    addComponents({
      [`.${e(`${element}-inset-0`)}::${element}`]: {
        content: `attr(data-content-${element})`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      [`.${e(`${element}-inset-x-0`)}::${element}`]: {
        content: `attr(data-content-${element})`,
        position: 'absolute',
        left: 0,
        right: 0,
      },
      [`.${e(`${element}-inset-y-0`)}::${element}`]: {
        content: `attr(data-content-${element})`,
        position: 'absolute',
        top: 0,
        bottom: 0,
      },
    })

    addVariant(element, ({ modifySelectors, separator }) => {
      modifySelectors(
        ({ className }) =>
          `.${e([element, className].join(separator))}::${element}`
      )
    })
  }
})

module.exports = pseudoElementVariants
