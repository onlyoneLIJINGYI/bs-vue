<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>首页</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="block">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>前端vue+后端springboot项目搭建，登录拦截完成</h4>
                        <p>后端连接数据库：与数据库user表形成映射关系，前端发送post请求，后端判断用户是否存在，存在即将用户信息保存localStorage，进入其他路由进行拦截判断用户登录状态</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>前端路由配置，首页布局导航完成</h4>
                        <p>首页初步完成</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </el-card>
</template>

<script>
    export default {
        name:"HomeIndex"
    }
</script>

<style scoped>

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }
</style>