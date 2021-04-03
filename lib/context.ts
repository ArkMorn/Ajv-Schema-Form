import { inject } from 'vue'
import { CommonFieldType } from './type'
export const SchemaFormContextKey = Symbol()
export function useVJSFContext() {
  const context: { SchemaFormItem: CommonFieldType } | undefined = inject(
    SchemaFormContextKey,
  )
  if (!context) {
    throw new Error('不存在context!')
  }
  return context
}
