<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 添加区域 -->
            <el-row :gutter="30">
                <el-col :span="3">
                    <el-button type="primary" @click="addDiglogVisable = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="infoList" border  height="523px">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="用户"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="roles[0].nameZh" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.enabled" @change="userStateChange(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDiglogInit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 10, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>

            <!-- 添加用户对话框 -->
            <el-dialog title="添加用户"
                       :visible.sync="addDiglogVisable"
                       width="50%"
                       :modal-append-to-body='false'
                       @close="diglogClose('add')">
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="addForm.phone"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
          <el-button @click="addDiglogVisable = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
            </el-dialog>

            <!-- 修改用户对话框 -->
          <!--  <el-dialog title="修改用户" :visible.sync="editDiglogVisable" width="50%" @close="diglogClose('edit')">
                &lt;!&ndash; 内容主体区域 &ndash;&gt;
                <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="70px">
                    <el-form-item label="用户名">
                        <el-input v-model="editForm.username" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="editForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                &lt;!&ndash; 底部区域 &ndash;&gt;
                <span slot="footer" class="dialog-footer">
          <el-button @click="editDiglogVisable = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
            </el-dialog>
-->
            <!-- 分配角色 -->
            <!--<el-dialog title="分配角色"
                       :modal-append-to-body='false'
                       :visible.sync="setRoleDiglogVisable"
                       width="50%"
                       @close="setRoleDiglogClose">
                &lt;!&ndash; 内容主体区域 &ndash;&gt;
                <div>
                    <p>当前的用户: {{ userInfo.username }}</p>
                    <p>当前的角色: {{ userInfo.roleName }}</p>
                    <p>
                        分配的角色:
                        <el-select v-model="selectedRoleId" placeholder="请选择">
                            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
                        </el-select>
                    </p>
                </div>
                &lt;!&ndash; 底部区域 &ndash;&gt;
                <span slot="footer" class="dialog-footer">
          <el-button @click="setRoleDiglogVisable = false">取 消</el-button>
          <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </span>
            </el-dialog>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        name:"UserRight",
        data() {
            // 验证邮箱的规则
            var checkEmail = (rule, value, cb) => {
                // 验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                if (regEmail.test(value)) {
                    // 合法的邮箱
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            }

            // 验证手机号的规则
            var checkMobile = (rule, value, cb) => {
                // 验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (regMobile.test(value)) {
                    return cb()
                }
                cb(new Error('请输入合法的手机号'))
            }
            return {
                infoList:[],
                queryInfo: {
                    query: '',
                    pagenum: 2,
                    pagesize: 10
                },
                total: 12,
                addDiglogVisable: false,
                addForm: {
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    phone: ''
                },

                editForm: {},
                editDiglogVisable: false,
                formRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ]
                },

                setRoleDiglogVisable: false,
                // 需要被分配角色的用户信息
                userInfo: {},
                roles: [],
                selectedRoleId: ''
            }
        },
        mounted () {
            this.loadUserInfo()
        },
        methods: {
            loadUserInfo(){
               this.$axios.get('/admin/user').then(resp=>{
                   if (resp.data) {
                       console.log(resp.data.result)
                       this.infoList = resp.data.result
                   }
               })

            },
            addUser(){
                this.$axios.post('/register',{
                    username: this.addForm.username,
                    password: this.addForm.password,
                    name: this.addForm.name,
                    phone: this.addForm.phone,
                    email: this.addForm.email
                }).then(resp => {
                    console.log(resp)
                    if (resp.data.code === 200) {
                        alert('注册成功')
                        this.addDiglogVisable = false
                        this.loadUserInfo()
                    } else {
                        alert(resp.data.message)
                        this.$refs.addFormRef.resetFields()
                    }
                })
            },
            deleteUserById(id){
                console.log(id)
            },
            editDiglogInit(){
                this.editDiglogVisable=true
            },
            // 监听pageSize改变事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getUserList()
            },
            // 监听页码值改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },
            // 监听switch开关状态的改变
            async userStateChange(userInfo) {
                const { data: resp } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.state}`)
                if (resp.meta.status !== 200) {
                    this.userInfo.state = !this.userInfo.state
                    this.$message.error('更新用户状态失败')
                }
                this.$message.success('更新用户状态成功')
            },

            //监听对话框关闭事件
            diglogClose(operation) {
                if (operation === 'add') {
                    this.$refs.addFormRef.resetFields()
                } else if (operation === 'edit') {
                    this.editDiglogVisable=false
                    this.$refs.editFormRef.resetFields()
                }
            },
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