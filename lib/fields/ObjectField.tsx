import { defineComponent, inject } from 'vue'
import { FiledPropsDefine } from '../type'
import { useVJSFContext } from '../context'
import { isObject } from '../utils'
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
    const { SchemaFormItem } = useVJSFContext()
    const handleChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }
      props.onChange(value)
    }
    return () => {
      const { schema, value, rootSchema } = props
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaFormItem
            value={currentValue[k]}
            onChange={(v: any) => {
              handleChange(k, v)
            }}
            schema={properties[k]}
            rootSchema={rootSchema}
            key={index}
          ></SchemaFormItem>
        )
      })
    }
  },
})
