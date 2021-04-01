import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../type'
export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return () => {
      const { value } = props
      return (
        <input type="text" value={value as any} onChange={handleChange}></input>
      )
    }
  },
})
