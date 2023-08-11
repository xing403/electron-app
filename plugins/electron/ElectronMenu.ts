import { MenuItemConstructorOptions, dialog } from "electron"

const CustomMenu = (args: any, callback: Function) => {
  const menu: MenuItemConstructorOptions[] = [
    {
      label: '首页',
      submenu: [
        { label: '关于', role: 'about' },
        { label: '隐藏', role: 'hide' },
        { label: '显示', role: 'unhide' },
        { label: '退出', role: 'quit' }
      ],
    }, {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          role: 'undo'
        },
        {
          label: '重做',
          role: 'redo'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
      ],
    }, {
      label: '帮助',
      submenu: [
        {
          label: '联系我们',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              buttons: ['确定'],
              title: '联系我们',
              message: 'github: https://github.com/xing403',
            }).then(res => {
              callback(res)
            })
          }
        },
        { label: '常见问题' },
        { label: '意见反馈' },
      ],
    }, {
      label: '设置',
      submenu: [
        { label: '主题' },
        { label: '语言' },
        {
          label: '调试工具',
          role: 'toggleDevTools'
        },
      ]
    }]
  return menu
}
const ContextMenu = (args, callback: Function) => {
  const menu: MenuItemConstructorOptions[] = [{
    label: '编辑',
    submenu: [
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '剪切',
        role: 'cut'
      },
      {
        label: '粘贴',
        role: 'paste'
      },
      {
        label: '删除',
        role: 'delete'
      },
      {
        label: '全选',
        role: 'selectAll'
      },
    ]
  },
  {
    label: '帮助',
    role: 'help'
  },
  {
    label: '刷新',
    role: 'reload'
  },
  {
    label: '关于',
    role: 'about'
  },
  {
    label: '关闭',
    role: 'close'
  },
  {
    label: '退出',
    role: 'quit'
  },
  ]
  return menu
}

export {
  CustomMenu,
  ContextMenu
}

export default CustomMenu
