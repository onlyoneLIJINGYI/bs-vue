<template>
    <el-menu
            class="categories"
            default-active="0"
            @select="handleSelect"
            active-text-color="red">
        <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">JavaScript</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">CSS3</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">Java</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">Vue.js</span>
        </el-menu-item>
        <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">Android</span>
        </el-menu-item>
        <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">数据结构</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'SideMenu',
        data () {
            return {
                cid: ''
            }
        },
        methods: {
            handleSelect (key, keyPath) {
                console.log(key,keyPath)
                this.cid = key
                this.$emit('indexSelect')
            }
        }
    }
</script>

<style scoped>
    .categories {
        position: fixed;
        margin-left: 46%;
        left: -40%;
        top: 100px;
        background-color: #f6f7f7;
        width: 150px;
    }
</style>

