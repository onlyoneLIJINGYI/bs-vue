<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>资源列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <el-row :gutter="30">
                <el-col :span="3">
                    <el-button type="primary" @click="editBook('上传')">添加资源</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="books" border  height="540px">
                <el-table-column
                        type="selection"
                        width="55px">
                </el-table-column>
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
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary"
                                   icon="el-icon-edit"
                                   size="mini"
                                   @click.native.prevent="editBook('编辑',scope.row)">

                        </el-button>
                        <el-button type="danger"
                                   icon="el-icon-delete"
                                   size="mini"
                                   @click.native.prevent="deleteBook(scope.row.id)">

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

<!--            编辑框-->
            <edit-form @onSubmit="loadBooks()"  ref="edit"></edit-form>

            <!-- 分页区域 -->
           <!-- <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[1, 2, 10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>-->
            <div style="margin: 20px 0 20px 0;float: left">
                <el-button>取消选择</el-button>
                <el-button>批量删除</el-button>
            </div>


        </el-card>
    </div>
</template>

<script>
    import EditForm from './EditForm'
    export default {
        name: 'Resource',
        components: {EditForm},
        data () {
            return {
                editFormTitle:'',
                books: []
            }
        },
        mounted () {
            this.loadBooks()
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        methods: {
            deleteBook (id) {
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$axios.post('/admin/resource/delete', {id: id}).then(resp => {
                            if (resp) {
                                this.loadBooks()
                            }
                        })
                    }
                ).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            editBook (title,item) {
                this.editFormTitle=title
                this.$refs.edit.title = title
                this.$refs.edit.dialogFormVisible = true
                this.$refs.edit.form = {
                    id: item.id,
                    cover: item.cover,
                    title: item.title,
                    author: item.author,
                    date: item.date,
                    press: item.press,
                    abs: item.abs,
                    category: {
                        id: item.category.id.toString(),
                        name: item.category.name
                    }
                }
                // this.$refs.edit.category = {
                //   id: item.category.id.toString()
                // }
            },
            loadBooks () {
                var _this = this
                this.$axios.get('/books').then(resp => {
                    if (resp.data) {
                        _this.books = resp.data
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
    /deep/.el-pagination, .el-table {
        margin-top: 10px;
    }
    /deep/.el-card__body{
        padding:15px 20px
    }
</style>