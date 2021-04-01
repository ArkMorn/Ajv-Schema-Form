import { defineComponent, computed } from 'vue'
import { SchemaTypes, FiledPropsDefine } from './type'
import { retrieveSchema } from './utils'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
export default defineComponent({
  name: 'SchemaFormItem',
  props: FiledPropsDefine,
  setup(props) {
    // 格式化schema传给object
    const retrieveSchemaRef = computed(() => {
      const { value, schema, rootSchema } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const retrievedSchemaRef = retrieveSchemaRef.value
      const schema = props.schema
      const type = (schema as any).type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        default: {
          console.warn(`${type} is no suppot`)
        }
      }
      return <Component {...props} schema={retrievedSchemaRef} />
    }
  },
})
