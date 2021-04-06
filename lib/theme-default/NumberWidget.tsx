import { defineComponent, PropType, ref, watch } from 'vue'
import { CommonWidgetsDefine, CommonWidgetsPropsDefine } from '../type'

const NumberWidget: CommonWidgetsDefine = defineComponent({
  name: 'NumberWidget',
  props: CommonWidgetsPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      const { value } = props
      return (
        <input
          type="number"
          value={value as any}
          onInput={handleChange}
        ></input>
      )
    }
  },
})
export default NumberWidget
