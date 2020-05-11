import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        menuIsCollapse:false,
        username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
        adminMenus: [],
        resourceData:window.localStorage.getItem('resource') == null ? '' : JSON.parse(window.localStorage.getItem('resource' || '{}'))
    },
    mutations:{
        initAdminMenu (state, menus) {
            state.adminMenus = menus
        },
        login (state,data){
            state.username = data
            window.localStorage.setItem('username', JSON.stringify(data))
        },
        menuCollapse(state,isCollapse){
            state.menuIsCollapse=isCollapse
        },
        logout (state) {
            // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
            state.username = ''
            window.localStorage.removeItem('username')
            //退出时将后台管理的菜单也清空，避免不同权限的用户登录后台对应菜单出现错误
            //state.adminMenus = []
        },
        resouceDetail(state,data){
            state.resourceData=data
            window.localStorage.setItem('resource', JSON.stringify(data))
        }

    }
})