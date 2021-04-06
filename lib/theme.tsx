import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ComputedRef,
} from 'vue'
import { Theme, widgetsName } from './type'

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

export function getWidget<T extends widgetsName>(name: T) {
  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY,
  )
  if (!context) {
    throw new Error('不存在context!')
  }
  const widget = computed(() => {
    return context.value.widgets[name]
  })
  return widget
}
export default ThemProvider
