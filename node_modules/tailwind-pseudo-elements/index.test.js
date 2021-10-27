const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const snapshotDiff = require('snapshot-diff')
const pseudoElementVariants = require('.')

it('works', async () => {
  // Use a trimmed-down tailwind config for smaller snapshots
  const config = {
    theme: {
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
      },
      backgroundColor: {
        black: 'black',
        white: 'white',
      },
    },
    corePlugins: ['preflight', 'margin', 'padding', 'backgroundColor'],
  }

  const config_with_plugin = {
    ...config,
    plugins: [pseudoElementVariants],
    variants: {
      margin: ({ after }) => after(['before', 'after']),
      backgroundColor: ({ after }) => after(['before', 'after']),
    },
  }

  const without_plugin = await tailwind_build(config)

  const with_plugin = await tailwind_build(config_with_plugin)

  expect(snapshotDiff(without_plugin, with_plugin)).toMatchSnapshot()
})

const css = `

@tailwind base;

@tailwind components;

@tailwind utilities;

`

const tailwind_build = (config) =>
  new Promise((resolve, reject) => {
    postcss([tailwindcss(config)])
      .process(css, { from: undefined })
      .then((result, err) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.css)
        }
      })
  })
