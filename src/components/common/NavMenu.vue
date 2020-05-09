<template>
    <el-menu
            :default-active="this.$route.path"
            router
            mode="horizontal"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            style="min-width: 1300px;box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
        </el-menu-item>
        <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">个性化学习资源推荐系统</span>
        <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
    </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
                navList: [
                    {name: '/library', navItem: '首页'},
                    {name: '/index', navItem: '我的资源'},
                    {name: '/admin', navItem: '个人中心'}
                ]
            }
        },
        methods:{
            logout () {
                var _this = this
                this.$axios.get('/logout').then(resp => {
                    if (resp.data.code === 200) {
                        // 前后端状态保持一致
                        _this.$store.commit('logout')
                        _this.$router.replace('/login')
                    }
                })
            }

        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }

    .el-icon-switch-button {
        cursor: pointer;
        outline:0;
    }
</style>

