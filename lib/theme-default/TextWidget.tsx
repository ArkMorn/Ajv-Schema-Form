import { defineComponent, PropType, ref, watch } from 'vue'
import { CommonWidgetsDefine, CommonWidgetsPropsDefine } from '../type'

const TextWidget: CommonWidgetsDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetsPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      const { value } = props
      return <input type="text" value={value as any} onInput={handleChange} />
    }
  },
})
export default TextWidget
