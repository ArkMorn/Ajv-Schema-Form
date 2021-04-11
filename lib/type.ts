/* eslint-disable */
import { defineComponent, PropType, DefineComponent } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

// type Schema = any
export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
} as const

const TypeHelperComponent = defineComponent({
  props: FiledPropsDefine,
})

export type CommonFieldType = typeof TypeHelperComponent

export const CommonWidgetsPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>,
  },
} as const
export const SelectWidgetPropsDefine = {
  ...CommonWidgetsPropsDefine,
  options: {
    type: Array as PropType<
      {
        label: string
        value: any
      }[]
    >,
    required: true,
  },
} as const

export type CommonWidgetsDefine = DefineComponent<
  typeof CommonWidgetsPropsDefine,
  {},
  {}
>

export type SelectWidgetDefine = DefineComponent<
  typeof SelectWidgetPropsDefine,
  {},
  {}
>

export enum widgetsName {
  SelectionWidget = 'Selection',
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [widgetsName.SelectionWidget]: SelectWidgetDefine
    [widgetsName.TextWidget]: CommonWidgetsDefine
    [widgetsName.NumberWidget]: CommonWidgetsDefine
  }
}
export type UISchema = {
  widget?: string | CommonWidgetsDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any
}
