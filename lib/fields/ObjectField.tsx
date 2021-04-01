import { defineComponent, inject } from 'vue'
import { FiledPropsDefine } from '../type'
import { SchemaFormContextKey } from '../context'
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
}
export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context: any = inject(SchemaFormContextKey)
    return () => {
      return null
    }
  },
})
