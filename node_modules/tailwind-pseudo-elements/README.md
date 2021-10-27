# Tailwind CSS pseudo-elements

A [Tailwind CSS](https://tailwindcss.com/) plugin to add [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) and [`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) pseudo-element [variants](https://tailwindcss.com/docs/configuring-variants).

## Install

```sh
yarn add tailwind-pseudo-elements
# or
npm install tailwind-pseudo-elements
```

## Add to tailwind.config.js

Add the plugin to the [`plugins` section](https://tailwindcss.com/docs/configuration#plugins) of your `tailwind.config.js` file.

```js
// tailwind.config.js

module.exports = {
  plugins: [require('tailwind-pseudo-elements')],
}
```

## Enable the variants

Tailwind has a couple of different ways to [configure your variants](https://tailwindcss.com/docs/configuring-variants), but I would recommend [appending the before and after variants to the defaults](https://tailwindcss.com/docs/configuring-variants#extending-default-variants) like so:

```js
// tailwind.config.js

module.exports = {
  variants: {
    // Defaults are ['responsive', 'hover', 'focus']
    backgroundColor: ({ after }) => after(['before', 'after']),
    // Output: ['responsive', 'hover', 'focus', 'before', 'after']
  },
}
```

## Example

```html
<p
  class="before-inset-0 before:bg-green-500 before:rounded-sm before:opacity-80"
  data-content-before="Check it out: "
>
  Check out this sumptuous green rectangle
</p>
```

## Usage

When you add the `before` or `after` variants to a plugin, additional classes with a `before:` or `after:` prefix are generated which look like this:

```css
.before\:h-3::before {
  height: 0.75rem;
}
```

To reduce the boilerplate of creating a pseudo-element there are `.before-content` and `.before-inset-0` helper classes (plus `.after-content` & `.after-inset-0`) which look like this:

```css
.before-content::before {
  content: attr(data-content-before);
}

.before-inset-0 {
  position: relative;
}

.before-inset-0::before {
  content: attr(data-content-before);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

There’s also `.before-inset-x-0` and `.before-inset-y-0` which only set `left`/`right` and `top`/`bottom`.

You can then modify or override those base styles as needed using `before:` or `after:` prefixed classes.

```html
<p class="before-inset-0 before:top-auto before:h-2 before:bg-green-500">
  Wow, how convenient is that?
</p>
```

The above example creates

## Pseudo-element content

The `.before-content` and `.after-content` classes both set the pseudo-element’s [content](https://css-tricks.com/css-content/) to the value of the element’s `data-content-before` and `data-content-after` attributes.

This lets you control the content of the pseudo-elements using either HTML or Javascript:

```html
<p class="before-content" data-content-before="You have to check this out: ">
  Amazing deals like you’ve never seen before! At these prices I'm practically
  giving them away! When you see how low our prices are you’ll think I’ve gone
  insane!
</p>
```
