import iCat_Gist_Menus from './iCat-Gist';

export default {
  base:'/iCat/',
  publicPath: './',
  mode: 'site',
  title: 'iCat',
  hash: true,
  resolve: {
    includes: ['docs', 'packages/iCat-Gist/src'],
  },
  navs: [
    { title: 'iCat-Gist', path: '/iCat-Gist' },
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
  },
};
