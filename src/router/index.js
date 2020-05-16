import Vue from 'vue'
import store from "../store"
import Router from 'vue-router'
import axios from 'axios'
import Login from '../components/Login'
import Register from '../components/Register'
import Admin from '../components/admin/Admin'
import AdminIndex from '../components/admin/Index'
// import UserRight from '../components/admin/UserRight'

import Home from '../components/Home'
import userCenterIndex from '../components/usercenter/Index'
import HomeIndex from '../components/home/HomeIndex'
import Detail from '../components/home/Detail'
import ResourceIntroduce from '../components/home/detail/ResourceIntroduce'
import ResourceRate from '../components/home/detail/ResourceRate'

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
                    name:'Index',
                    component:HomeIndex,
                    meta:{
                        requireAuth:true
                    }
                },
                {
                    path:'/usercenter',
                    name:'userCenterIndex',
                    component:userCenterIndex,
                    meta:{
                        requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                    }
                },
                {
                    path:'/detail',
                    name:'resourceDetail',
                    component:Detail,
                    redirect:'/detail/introduce',
                    meta:{
                        requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                    },
                    children:[
                        {
                            path:'introduce',
                            name:'ResourceIntroduce',
                            component:ResourceIntroduce,
                            meta:{
                                requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                            }
                        },
                        {
                            path:'rate',
                            name:'ResourceRate',
                            component:ResourceRate,
                            meta:{
                                requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                            }
                        },
                    ]
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
            //根据菜单数据创建路由，并作为admin子路由
            const routerData = [{
                path: "/admin",
                name: "Admin",
                component: Admin,
                redirect:'/admin/index',
                children:fmtRoutes,
                meta:{
                    requireAuth:true//设置meta字段以此判断当前路由是否需要拦截
                }
            }]
            console.log(routerData)
            router.addRoutes(routerData)
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
            component: () => import('../components/admin/' + route.component),
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
    /*if (store.state.username && to.path.startsWith('/admin')) {
        initAdminMenu(router, store)
    }*/
    if(to.matched.some((record)=> record.meta.requireAuth)){
    //$route.matched存放当前路由匹配到的所有路由记录，判断路由记录中的meta字段的requireAuth为true，判断登录状态
        if(store.state.username){
            if (to.path.startsWith('/admin')) {
                initAdminMenu(router, store)
            }
            //store中user对象username属性为true，即继续进入下一路由，该种方法安全性较差，只在前端判断本地存储是否含有用户，可以通过修改localStorage存储的数据即可绕过前端路由限制
            // next()
            //路由拦截后向后端发送请求，由后端拦截器验证服务器端用户的登录状态
            axios.get('/authentication').then(resp => {
                if (resp) next()
            },resp=>{
                if(resp){
                    next({
                        path:'/login',
                        query:{redirect:to.pullpath}
                    })
                }
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