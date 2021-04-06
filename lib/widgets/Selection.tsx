import { defineComponent, PropType, ref, watch } from 'vue'
import { SelectWidgetPropsDefine, SelectWidgetDefine } from '../type'

const Selection: SelectWidgetDefine = defineComponent({
  name: 'Selection',
  props: SelectWidgetPropsDefine,
  setup(props) {
    const currentValue = ref(props.value)
    watch(currentValue, (newV) => {
      if (newV !== props.value) {
        props.onChange(newV)
      }
    })

    watch(
      () => props.value,
      (newV) => {
        if (newV !== currentValue.value) {
          currentValue.value = newV
        }
      },
    )

    return () => {
      return (
        <select multiple={true} v-model={currentValue.value}>
          {props.options.map((v) => {
            return <option value={v.value}>{v.label}</option>
          })}
        </select>
      )
    }
  },
})
export default Selection
