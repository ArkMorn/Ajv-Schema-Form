import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../type'
import { widgetsName } from '../type'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e)
    }
    const TextWidgetRef = getWidget(widgetsName.TextWidget)
    return () => {
      const { schema, rootSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value
      return <TextWidget {...rest} onChange={handleChange}></TextWidget>
    }
  },
})
