import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ComputedRef,
  ExtractPropTypes,
  ref,
} from 'vue'
import {
  Theme,
  widgetsName,
  FiledPropsDefine,
  CommonWidgetsDefine,
} from './type'
import { isObject } from './utils'

const THEME_PROVIDER_KEY = Symbol()
export const ThemProvider = defineComponent({
  name: 'ThemProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    provide(
      THEME_PROVIDER_KEY,
      computed(() => {
        return props.theme
      }),
    )
    return () => {
      return slots.default && slots.default()
    }
  },
})

export function getWidget<T extends widgetsName>(
  name: T,
  props?: ExtractPropTypes<typeof FiledPropsDefine>,
) {
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY,
  )
  if (props) {
    const { uiSchema } = props
    if (uiSchema.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetsDefine)
    }
  }
  if (!context) {
    throw new Error('不存在context!')
  }
  const widget = computed(() => {
    return context.value.widgets[name]
  })
  return widget
}
export default ThemProvider
