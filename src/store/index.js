import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        menuIsCollapse:false,
        user: {
            username: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user' )|| '[]').username
        },
        adminMenus: []
    },
    mutations:{
        initAdminMenu (state, menus) {
            state.adminMenus = menus
        },
        login (state,user){
            state.user=user
            localStorage.setItem('user', JSON.stringify(user))
        },
        menuCollapse(state,isCollapse){
            state.menuIsCollapse=isCollapse
        },
        logout (state) {
            state.user = []
            window.localStorage.removeItem('user')
            //退出时将后台管理的菜单也清空，避免不同权限的用户登录后台对应菜单出现错误
            state.adminMenus = []
        }

    }
})