import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'
import { FiledPropsDefine } from '../type'
import { useVJSFContext } from '../context'
import { Schema } from '../type'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      const handleAdd = () => {
        props.onAdd(props.index)
      }
      const handleDelete = () => {
        props.onDelete(props.index)
      }
      const handleUp = () => {
        props.onUp(props.index)
      }
      const handleDown = () => {
        props.onDown(props.index)
      }
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const handleArrayChange = (v: any, k: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[k] = v
      props.onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }
    return () => {
      const { SchemaFormItem } = useVJSFContext()
      const { value, schema, rootSchema } = props
      const arr = Array.isArray(value) ? value : []
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const list: Schema[] = schema.items as any
        return list.map((s: Schema, index: number) => {
          return (
            <SchemaFormItem
              key={index}
              onChange={(v: any) => {
                handleArrayChange(v, index)
              }}
              value={arr[index]}
              schema={s}
              rootSchema={rootSchema}
            ></SchemaFormItem>
          )
        })
      } else if (!isSelect) {
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              key={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaFormItem
                onChange={(v: any) => {
                  handleArrayChange(v, index)
                }}
                value={v}
                schema={schema.items as Schema}
                rootSchema={rootSchema}
              ></SchemaFormItem>
            </ArrayItemWrapper>
          )
        })
      }
    }
  },
})
