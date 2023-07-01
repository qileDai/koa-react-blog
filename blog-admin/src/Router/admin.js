import loadable from '../utils/loadable'
import store from "../store";
const Tags = loadable(()=>import('../pages/admin/tags'))
const Star = loadable(()=>import('../pages/admin/star'))
const Home = loadable(()=>import('../pages/admin/home'))
const Category = loadable(()=>import('../pages/admin/category'))
const Article = loadable(()=>import('../pages/admin/article'))
const ArticleItem = loadable(()=>import('../pages/admin/article/item'))
const Person = loadable(() => import('../pages/admin/person/user'))
const setting = loadable(() => import("../pages/admin/person/setting"))
const authority  = store.getState().userInfo.authority;
const routes = [
  {
    menu: true,
    icon: "home",
    title: "首页",
    path: "/admin/page",
    component: Home,
  },
  {
    menu: true,
    icon: "edit",
    title: "文章",
    path: "/admin/article",
    component: Article,
  },
  {
    menu: true,
    icon: "tags",
    title: "标签",
    path: "/admin/tags",
    component: Tags,
  },
  {
    menu: true,
    icon: "folder",
    title: "分类",
    path: "/admin/category",
    component: Category,
  },
  {
    menu: true,
    icon: "star",
    title: "收藏",
    path: "/admin/star",
    component: Star,
  },
  {
    icon: "edit",
    title: "新增文章",
    path: "/admin/article-add",
    component: ArticleItem,
  },
  {
    icon: "edit",
    title: "文章详情",
    path: "/admin/article-edit/:id",
    component: ArticleItem,
  },
  {
    menu: authority=='1'?true:false,
    icon: "setting",
    title: "用户设置",
    path: "/admin/person/user",
    component: Person,
    children: [],
  },
  {
    menu: true,
    icon: "user",
    title: "个人中心",
    path: "/admin/person/setting",
    component: setting,
  },
];

export default routes