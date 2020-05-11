<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>资源评价</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">

            <!-- 评价列表区域 -->
            <el-table :data="commentList" border  height="563px">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="book.title" label="资源标题"></el-table-column>
                <el-table-column prop="rate" label="评分"></el-table-column>
                <el-table-column prop="comment" label="评论" fit></el-table-column>
                <el-table-column prop="user.username" label="用户"></el-table-column>
                <!--<el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.enabled" @change="userStateChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>-->
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDiglogInit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <!--<el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 10, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>-->


        </el-card>
    </div>
</template>

<script>
    export default {
        name:"ResourceComment",
        data() {
            return {
                commentList: []
            }
        },
        mounted () {
            this.loadCommnetInfo()
        },
        methods: {
            loadCommnetInfo(){
                this.$axios.get('/admin/rate').then(resp=>{
                    if (resp.data) {
                        console.log(resp.data)
                        this.commentList = resp.data
                    }
                })

            }
        }
    }
</script>
<style scoped>
    .breadcrumb{
        overflow: hidden;
        height: 40px;
        line-height: 40px;
    }
</style>