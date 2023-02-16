import { h } from 'vue'
import randiman from './lib/random'
import { BACKGROUND_COLORS, TEXT_COLORS, SHAPE_COLORS } from './lib/colors'
import Shape from './shape/shape'


const DEFAULTS = {
  style: "character",
  size: 32,
  shadow: false,
  border: false,
  borderSize: 2,
  borderColor: "#fff"
}

const Wrapper = (p, context) => {
  const style =  {
    width: p.size + "px",
    height: p.size + "px",
    borderRadius: (p.radius || p.size) + "px",
    backgroundColor: "#" + p.color,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    hover: {
      zIndex: 3
    }
  }
  if (p.border) style['border'] = p.borderSize + "px solid " + p.borderColor
  if (p.shadow) style['boxShadow'] = "0px 3px 8px rgba(18, 18, 18, 0.04), 0px 1px 1px rgba(18, 18, 18, 0.02)"
  return h('div', style)
}

const Text = (p, context) => {
  return h('p', {
    margin: 0,
    padding: 0,
    textAlign: "center",
    boxSizing: "border-box",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
    fontSize: Math.round(p.size / 100 * 37) + "px",
    color: "#" + p.color,
    lineHeight: 0,
    textTransform: "uppercase",
    fontWeight: 500
  })
}

const Avvvatar = (props, context) => {
  const {
    style = DEFAULTS.style,
    displayValue,
    value,
    radius,
    size = DEFAULTS.size,
    shadow = DEFAULTS.shadow,
    border = DEFAULTS.border,
    borderSize = DEFAULTS.borderSize,
    borderColor = DEFAULTS.borderColor
  } = props

  const name = String(displayValue || value).substring(0, 2);

  const key = randiman({ value, min: 0, max: 19 });

  const shapeKey = randiman({ value, min: 1, max: 12 })

  let elem;
  if (style === 'character') {
    elem = h(Text, {
      color: TEXT_COLORS[key],
      size: size
    }, name)
  } else {
    elem = h(Shape, {
      name: `Shape${shapeKey}`,
      color: SHAPE_COLORS[key],
      size: Math.round((size) / 100 * 50)
    })
  }

  return h(Wrapper, {
    size: size,
    color: BACKGROUND_COLORS[key],
    shadow: shadow,
    border: border,
    borderSize: borderSize,
    borderColor: borderColor,
    radius: radius
  }, [elem])
}

export default Avvvatar