<template>
    <div class="nav-header">
        <el-menu
                router
                mode="horizontal"
                background-color="#2f4050"
                text-color="#fff"
                active-text-color="#ffd04b">
            <span class="title">个性化学习资源推荐系统</span>
            <el-menu-item :index="'/login'">
                <i class="el-icon-s-custom"></i>
                <span slot="title">退出</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
                keywords: ''
            }
        },
        computed: {
            currentPath () {
                var x = this.$route.path.indexOf('/', 1)
                if (x !== -1) {
                    return this.$route.path.substring(0, x)
                } else {
                    return this.$route.path
                }
            }
        }
    }
</script>

<style scoped>
    .title{
        display: inline-block;
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        width: 40%;
        color: #f2f0f0;
        font-size: 20px;
        font-weight: bold
    }
    .nav-header /deep/.el-menu-item{
        float:right;
    }
    /deep/.el-menu.el-menu--horizontal{
        border: 0;
    }
    a{
        text-decoration: none;
    }
    span {
        pointer-events: none;
    }
</style>