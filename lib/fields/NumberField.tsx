import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../type'
export default defineComponent({
  name: 'NumberSchema',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = Number(e.target.value)
      if (Number.isNaN(value)) {
        props.onChange(undefined)
      } else {
        props.onChange(e.target.value)
      }
    }
    return () => {
      const { value } = props
      return (
        <input type="number" value={value as any} onChange={handleChange} />
      )
    }
  },
})
