<template>
    <div class="detail-container">
        <div class="course-infos">
            <div class="w pr">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>资源详情</el-breadcrumb-item>
                    <el-breadcrumb-item>{{resourceData.title}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="title">
                    深入浅出Java多线程
                </div>

                <div class="statics clearfix">


                    <div class="static-item l">
                        <span class="meta">难度</span><span class="meta">入门</span>
                    </div>
                    <div class="static-item l">
                        <span class="meta">时长</span><span class="meta"> 4小时 0分</span>
                    </div>
                    <div class="static-item l">
                        <span class="meta">学习人数</span><span class="meta">178660</span>
                    </div>

                    <div class="static-item l score-btn">
                        <span class="meta">综合评分</span><span class="meta">9.23</span>


                        <!--<div class="score-wrap triangle">
                            <div class="score-box">
                                <a href="/coursescore/202" class="person-num">
                                    <span class="person-num l">633人评价</span>
                                </a>
                                <a href="/coursescore/202?page=1" class="evaluation-btn r">查看评价</a>
                                <div class="score-detail-box">
                                    <div class="score-static-item">
                                        <span class="meta-value">9.5</span>
                                        <span class="meta">内容实用</span>
                                    </div>
                                    <div class="score-static-item">
                                        <span class="meta-value">9.2</span>
                                        <span class="meta">简洁易懂</span>
                                    </div>
                                    <div class="score-static-item">
                                        <span class="meta-value">9.0</span>
                                        <span class="meta">逻辑清晰</span>
                                    </div>
                                </div>
                                <div class="icon-drop_down"></div>
                            </div>

                        </div>
-->
                    </div>
                </div>

            </div>

        </div>
        <el-menu
                :default-active="this.$route.path"
                class="el-menu-demo center"
                router
                mode="horizontal"
                @select="handleSelect"
                background-color="rgb(249, 247, 247)"
                text-color="#000"
                active-text-color="#ffd04b"
        >
            <el-menu-item :index="'/detail/introduce'">资源介绍</el-menu-item>
            <el-menu-item :index="'/detail/rate'">等级评价</el-menu-item>
        </el-menu>
        <div class="center">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Detail",
        data(){
            return{
            }
        },
        computed:{
            resourceData () {
                return this.$store.state.resourceData
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .course-infos {
        position: relative;
        background-color: #220A03;
        color: #ffffff;
    }
    .w {
        height: 200px;
        max-width: 1000px;
        margin: 0 auto;
        padding: 27px 10px;
    }
    .center{
        padding: 0px 250px;
    }
    .breadcrumb{
        color: #fff;
        font-size: 14px;
    }
    .breadcrumb/deep/.el-breadcrumb__inner{
        color:#fff;
    }
    .breadcrumb/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        color:#fff;
    }
    .statics {
        color: #fff;
        font-size: 0;
        position: relative;
        z-index: 3;
        margin-right: 320px;
    }
    .static-item {
        display: inline-block;
        position: relative;
        margin-right: 16px;
        font-size: 12px;
        top: 15px;
    }
    .l {
        float: left;
    }
    .title{
        margin: 20px 0;
        font-size: 29px;
        line-height: 52px;
    }
    .meta{
        padding-right: 11px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 600;
    }
</style>