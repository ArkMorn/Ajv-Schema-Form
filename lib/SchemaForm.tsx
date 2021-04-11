import {
  defineComponent,
  PropType,
  provide,
  watch,
  Ref,
  ref,
  shallowRef,
} from 'vue'
import Ajv, { Options } from 'ajv'
import { Schema, UISchema } from './type'
import { SchemaFormContextKey } from './context'
import SchemaFormItem from './SchemaFormItem'
import { validateFormData, ErrorSchema } from './validator'
interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}
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
    contextRef: {
      type: Object as PropType<Ref<ContextRef> | undefined>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    provide(SchemaFormContextKey, { SchemaFormItem })
    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    async function doValidate() {
      console.log('start validate -------->')
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )

      if (index !== validateIndex.value) return
      console.log('end validate -------->')

      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)
      validateResolveRef.value = undefined

      // return result
    }
    const validateResolveRef = ref()
    const validateIndex = ref(0)
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate: () => {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      { immediate: true },
    )
    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaFormItem
          schema={schema}
          rootSchema={schema}
          value={value}
          uiSchema={uiSchema || {}}
          onChange={handleChange}
        />
      )
    }
  },
})
