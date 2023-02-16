import { h } from 'vue'
import * as shapes from "./shapes"


const Shape = (props, context) => {
    const { name, size = 24, color } = props
    const Tag = shapes[name]
    if(!Tag) {
        return null
    }
    return h('span', { name, size, color, role: "img",  display: "inline-flex", alignItems: "center", verticalAlign: "middle"}, [
        h(Tag, { width: size })
    ])
}

export default Shape