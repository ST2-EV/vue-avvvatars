# Vue Avvvatars

A vue3 port of [avvvatars-react](https://github.com/nusu/avvvatars)

> Beautifully crafted unique avatar placeholder for your next react project Lightweight and customizable ❤️.

https://user-images.githubusercontent.com/1702215/158075475-c23004ab-827a-45ad-bdba-aee29ac5b582.mp4

Credits:

React Authors: [Nusu Alabuga](https://twitter.com/nusualabuga) and [Oguz Yagiz Kara](https://twitter.com/oguzyagizkara)

🙏 Special thanks to [Monika Michalczyk](https://www.monikamichalczyk.com/) for awesome shapes 🙏

## Installation

**With npm**

```
npm install vue-avvvatars
```

## Getting Started

Import Avvvatars to your app, then use it anywhere you want.

```vue
import { createApp } from 'vue'
import App from './App.vue'
import avvvatar from  'vue-avvvatars'

const app = createApp(App)
app.use(avvvatar)
app.mount('#app')

```

## Customization

### `value: string`

This is required for plugin to work, each value generates a random avatar to unique to this value, so each time plugin renders, you will get the same results.

```vue
<VueAvvvatar value="best_user@gmail.com" />
```

### `displayValue?: string`

Override default text by providing displayValue

for example if you provide `value=”best_user@gmail.com”` the character output will be the first 2 letters of value which is “BE”, if you pass `displayValue=”BU”` you can override it to **BU**

```vue
<VueAvvvatar value="best_user@gmail.com" displayValue="BE" />
```

### `style?: character | shape  (default character)`

Use shape or character as avatar.

```vue
<VueAvvvatar value="best_user@gmail.com" style="character" />
```

### `size?: number  (default 32)`

Override default size (32px) by providing a number.

```vue
<VueAvvvatar value="best_user@gmail.com" size="32" />
```

### `shadow?: boolean  (default false)`

Enable shadow around the avatar.

```vue
<VueAvvvatar value="best_user@gmail.com" :shadow="false" />
```

### `radius?: number (default [size](https://github.com/nusu/avvvatars#size-number--default-32))`

Override the radius of the avatar, it takes `size` by default to always turn it to a circle

```vue
<VueAvvvatar value="best_user@gmail.com" radius="10" />
```

### `border?: boolean  (default false)`

Toggle border

```vue
<VueAvvvatar value="best_user@gmail.com" :border="false" />
```

### `borderSize?: number  (default 2)`

Override border width

```vue
<VueAvvvatar value="best_user@gmail.com" borderSize="2" />
```

### `borderColor?: string  (default #fff)`

Override border color

```vue
<VueAvvvatar value="best_user@gmail.com" borderColor="#fff" />
```

## License

[MIT](https://github.com/ST2-EV/vue-avvvatars/blob/master/LICENSE.md)
