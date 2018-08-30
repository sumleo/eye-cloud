import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '个人信息',
    icon: 'user',
    path: 'my',
    children: [
      {
        name: '我的主页',
        path: 'index',
        authority: 'doctor',
      },
      {
        name: '更新/完善个人信息',
        path: 'edit',
        authority: 'doctor',
      },
    ],
  },
  {
    name: '资料下载',
    icon: 'download',
    path: 'download',
    children: [
      {
        name: '资料下载',
        path: 'index',
      },
    ],
  },
  {
    name: '糖尿病视网膜病变筛查',
    icon: 'book',
    path: 'diabetes',
    children: [
      {
        name: '上传图片',
        path: 'upload',
        authority: 'doctor',
      },
      {
        name: '我的任务列表',
        path: 'tasklist',
        authority: 'doctor',
      },
    ],
  },
  // {
  //   name: '左右眼识别',
  //   icon: 'eye',
  //   path: 'eye',
  //   children: [
  //     {
  //       name: '上传图片',
  //       path: 'upload',
  //     },
  //     {
  //       name: '我的任务列表',
  //       path: 'tasklist',
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
