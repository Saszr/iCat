import iCat_Gist_Menus from './iCat-Gist';
import iCat_hooks_Menus from './iCat-hooks';
import iCat_visualization_Menus from './iCat-visualization';

export default {
  mode: 'site',
  title: 'iCat',
  hash: true,
  resolve: {
    includes: [
      'docs',
      'packages/iCat-Gist/src',
      'packages/iCat-hooks/src',
      'packages/iCat-visualization/src',
    ],
  },
  navs: [
    { title: 'iCat-Gist', path: '/iCat-Gist' },
    { title: 'iCat-hooks', path: '/iCat-hooks' },
    { title: 'iCat-visualization', path: '/iCat-visualization' },
    { title: 'GitHub', path: 'https://github.com/Saszr/iCat' },
  ],
  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index',
      },
    ],
    '/iCat-Gist': iCat_Gist_Menus,
    '/iCat-hooks': iCat_hooks_Menus,
    '/iCat-visualization': iCat_visualization_Menus,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
};
