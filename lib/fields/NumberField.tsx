import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../type'
import { widgetsName } from '../type'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberSchema',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = Number(e)
      if (Number.isNaN(value)) {
        props.onChange(undefined)
      } else {
        props.onChange(e)
      }
    }

    const NumberWidgetRef = getWidget(widgetsName.NumberWidget)
    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { schema, rootSchema, ...rest } = props
      return <NumberWidget {...rest} onChange={handleChange}></NumberWidget>
    }
  },
})
