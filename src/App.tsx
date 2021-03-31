import { defineComponent, ref, Ref } from 'vue'
import MonacoEditor from '@/components/MonacoEditor'

const toJSON = (data: any) => {
  return JSON.stringify(data, null, 2)
}
const schema = {
  type: 'string',
}
export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)
    const onhandleChange = (code: string) => {
      let schema: any
      try {
        schema = JSON.parse(code)
      } catch (e) {
        // some thing
      }
      schemaRef.value = schema
    }
    return () => {
      const code = toJSON(schemaRef.value)
      return (
        <div>
          <MonacoEditor
            code={code}
            onChange={onhandleChange}
            title="shcema"
          ></MonacoEditor>
        </div>
      )
    }
  },
})
