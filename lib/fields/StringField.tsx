import { defineComponent, computed } from 'vue'
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
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(widgetsName.TextWidget, props)
      return widgetRef.value
    })
    const WidgetOptionRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })
    return () => {
      const { rootSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value
      return (
        <TextWidget
          {...rest}
          onChange={handleChange}
          options={WidgetOptionRef.value}
        ></TextWidget>
      )
    }
  },
})
