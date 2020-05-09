<template>
    <div class="nav-container">
        <el-tooltip content="折叠菜单" placement="top">
            <el-button class="menu-btn" @click="menuCollapse" icon="el-icon-s-fold" ></el-button>
        </el-tooltip>
        <el-menu :default-active="this.$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 router
                 :collapse="isCollapse"
                 background-color="#2f4050"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        >
            <template v-for="(menu) in adminMenuList">
                <el-submenu v-if="menu.children.length" :index="menu.path" :key="menu.id">
                    <template slot="title">
                        <i :class="menu.iconCls"></i>
                        <span slot="title">{{menu.nameZh}}</span>
                    </template>
                    <el-menu-item v-for="item in menu.children" :index="item.path" :key="item.id">{{item.nameZh}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else  :index="menu.path" :key="menu.id">
                    <i :class="menu.iconCls"></i>
                    <span slot="title">{{menu.nameZh}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name:"NavMenu",
        data(){
            return{
                isCollapse:false,
                menuList:[
                    {id:1,title:'首页',path:'/index'},
                    {id:2,title:'用户管理',path:'2',
                        subMenu:[
                        {
                            id:1,
                            title:'用户权限',
                            path:'/right'
                        },{
                                id:2,
                                title:'用户功能',
                                path:'1-2'
                          }
                        ]},
                    {id:3,title:'资源管理',path:'3',
                        subMenu:[
                            {
                                id:1,
                                title:'资源搜索',
                                path:'2-1'
                            },{
                                id:2,
                                title:'资源评价',
                                path:'2-2'
                            },{
                                id:3,
                                title:'资源推荐',
                                path:'2-3'
                            },{
                                id:4,
                                title:'资源上传',
                                path:''
                            },{
                                id:5,
                                title:'资源下载',
                                path:''
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            adminMenuList () {
                return this.$store.state.adminMenus
            }
        },
        methods: {
            menuCollapse(){
                this.isCollapse=!this.isCollapse
                this.$store.commit('menuCollapse',this.isCollapse)
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .nav-container{
        /*float: left;*/
        position: fixed;
        left: 0;
        top: 60px;
        bottom: 0;
        height: 700px;
        background-color:#2f4050
    }
    .nav-container/deep/.el-menu{
        border:0;
    }
    .menu-btn{
        color: green;
        background: #2f4050;
        border: 0;
        font-size: 20px;
    }
    .menu-btn:hover,.menu-btn:focus{
        color: green;
        background:rgb(38,51,64);
        border: 0;
        font-size: 20px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 370px;
    }


</style>