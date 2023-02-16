import { h } from 'vue'
import * as shapes from "./shapes"


const Shape = (props, context) => {
    const { name, size = 24, color } = props
    const Tag = shapes[name]
    if(!Tag) {
        return null
    }
    return h('span', { name: name, size: size, role: "img",  style: {display: "inline-flex", alignItems: "center", verticalAlign: "middle", color: "#"+color}}, [
        h(Tag, { width: size })
    ])
}

export default Shape