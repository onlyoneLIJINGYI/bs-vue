import Vue from 'vue'
import store from "../store"
import Router from 'vue-router'
import axios from 'axios'
import Login from '../components/Login'
import Register from '../components/Register'
import Admin from '../components/Admin'
import AdminIndex from '../components/admin/Index'
import UserRight from '../components/user/UserRight'

import Home from '../components/Home'
import HomeIndex from '../components/home/Index'
import LibraryIndex from '../components/library/LibraryIndex'

Vue.use(Router)

const router=new Router({
    mode:'history',
    routes:[
        {
            path: "/home",
            name: "Home",
            component: Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'HomeIndex',
                    component:HomeIndex,
                    meta:{
                        requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                    }
                },{
                path:'/library',
                    name:'Library',
                    component:LibraryIndex,
                    meta:{
                    requireAuth:true
                    }
                }
            ]
        },
        {
            path: "/admin",
            name: "Admin",
            component: Admin,
            redirect:'/admin/index',
            children:[
                {
                    path:'index',
                    name:'Index',
                    component:AdminIndex,
                    meta:{
                        requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                    }
                },{
                    path:'right',
                    name:'UserRight',
                    component:UserRight,
                    meta:{
                        requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                    }
                }
            ]
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/register',
            name:'Register',
            component:Register
        }
    ]
})
export default router;

//后台初始化菜单，通过后端返回当前用户对应的菜单信息，调用formatRoutes方法生成路由匹配规则，并添加到路由表中，并更新store中的菜单数据，使admin中的NavMenu组件可以获取用户菜单数据进行动态渲染菜单组件
const initAdminMenu = (router, store) => {
    // 防止重复触发加载菜单操作
    if (store.state.adminMenus.length > 0) {
        return
    }
    axios.get('/menu').then(resp => {
        if (resp && resp.status === 200) {
            var fmtRoutes = formatRoutes(resp.data.result)
            router.addRoutes(fmtRoutes)
            store.commit('initAdminMenu', fmtRoutes)
        }
    })
}

const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(route => {
        if (route.children) {
            route.children = formatRoutes(route.children)
        }

        let fmtRoute = {
            path: route.path,
            component: resolve => {
                require(['../components/admin/' + route.component + '.vue'], resolve)
            },
            name: route.name,
            nameZh: route.nameZh,
            iconCls: route.iconCls,
            meta: {
                requireAuth: true
            },
            children: route.children
        }
        fmtRoutes.push(fmtRoute)
    })
    return fmtRoutes
}


//通过路由beforeEach钩子函数，判断路由记录中的meta字段进行路由拦截，判断用户登录状态
router.beforeEach((to,from,next)=>{
    //用户登录后要进入 /admin开头的路径时，调用initAdminMenu 方法初始化后台管理系统中当前用户对应的菜单信息
    if (store.state.user.username && to.path.startsWith('/admin')) {
        initAdminMenu(router, store)
    }
    if(to.matched.some((record)=> record.meta.requireAuth)){
    //$route.matched存放当前路由匹配到的所有路由记录，判断路由记录中的meta字段的requireAuth为true，判断登录状态
        if(store.state.user.username){
            //store中user对象username属性为true，即继续进入下一路由，该种方法安全性较差，只在前端判断本地存储是否含有用户，可以通过修改localStorage存储的数据即可绕过前端路由限制
            // next()
            //路由拦截后向后端发送请求，由后端拦截器验证服务器端用户的登录状态
            axios.get('/authentication').then(resp => {
                if (resp) next()
            })
        }else{
        //    用户信息不存在，路由跳转到login
            next({
                path:'/login',
                query:{redirect:to.pullpath}
            })
        }
    }else{
        next()
    }
})