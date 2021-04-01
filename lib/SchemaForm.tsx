import { defineComponent, PropType, provide } from 'vue'
import { Schema } from './type'
import { SchemaFormContextKey } from './context'
import SchemaFormItem from './SchemaFormItem'
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    provide(SchemaFormContextKey, { SchemaFormItem })
    return () => {
      const { schema, value } = props
      return (
        <SchemaFormItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
