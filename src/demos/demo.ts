// import PasswordWidget from '../components/PasswordWiget'

export default {
  name: 'Demo',
  uiSchema: {},
  schema: {
    type: 'string',
    // items: [
    //   {
    //     type: 'string',
    //   },
    //   {
    //     type: 'number',
    //   },
    // ],
  },
  // async customValidate(data: any, errors: any) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (data.pass1 !== data.pass2) {
  //         errors.pass2.addError('密码必须相同')
  //       }
  //       resolve()
  //     }, 2000)
  //   })
  // },
  // uiSchema: {
  //   properties: {
  //     pass1: {
  //       widget: PasswordWidget,
  //     },
  //     pass2: {
  //       color: 'red',
  //     },
  //   },
  // },
  default: 1,
}
