import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { CommonWidgetsDefine, CommonWidgetsPropsDefine } from '../type'
import { withFormItem } from './FormItem'

const TextWidget: CommonWidgetsDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetsPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black',
        }
      })
      return () => {
        const { value } = props
        return (
          <input
            type="text"
            value={value as any}
            onInput={handleChange}
            style={styleRef.value}
          />
        )
      }
    },
  }),
)
export default TextWidget
