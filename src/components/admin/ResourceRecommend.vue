<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>资源推荐</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="30" style="margin-bottom:10px">
                <el-col :span="8">
                    <el-input
                            placeholder="请输入用户id查询推荐列表"
                            prefix-icon="el-icon-search"
                            v-model="userid">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="recommend">资源推荐</el-button>
                </el-col>
            </el-row>

            <!-- 评价列表区域 -->
            <el-table :data="recommendList" border  height="563px">
                <el-table-column type="index"></el-table-column>
                <el-table-column type="expand" label="简介">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item>
                                <span>{{ props.row.abs }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="资源标题（展开查看简介）"
                        fit>
                </el-table-column>
                <el-table-column
                        prop="category.name"
                        label="分类"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="难度等级"
                >
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="时长"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="press"
                        label="资源来源"
                        fit>
                </el-table-column>
                <!--<el-table-column prop="comment" label="评论" ></el-table-column>
                <el-table-column prop="user.username" label="用户"></el-table-column>-->
                <!--<el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.enabled" @change="userStateChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>-->
               <!-- <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDiglogInit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>-->
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
        name:"ResourceRecommend",
        data() {
            return {
                recommendList: [],
                userid:''
            }
        },
        methods: {
            recommend() {
                this.$axios
                    .post('/recommend', {
                        id: this.userid
                    })
                    .then(resp => {
                        if (resp.data) {
                            this.recommendList=resp.data
                            console.log(resp)
                        } else {
                            console.log('请求失败')
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
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