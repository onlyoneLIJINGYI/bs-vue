<template>
    <div class="admin">
        <nav-header></nav-header>
        <nav-menu></nav-menu>
        <div class="content" :style="{left: this.isCollapse?'64px':'200px'}">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NavMenu from './NavMenu'
    import NavHeader from './NavHeader'
    export default {
        name:"Admin",
        components:{
            NavMenu,
            NavHeader
        },
        computed:{
            isCollapse(){
                return this.$store.state.menuIsCollapse
            }
        }
    }
</script>

<style scoped>
    .admin{
        background-color: #2f4050;
    }
    .content{
        box-sizing: border-box;
        position: fixed;
        top: 60px;
        left: 65px;
        right: 0;
        bottom: 0;
        /*width: 100%;
        height: 700px;*/
        padding: 5px 30px;
        background-color: #f2f4f3;
    }
</style>