<template>
    <div class="login-container">
        <el-form class="login-form" label-position="left"
                 label-width="0px" v-loading="loading">
            <h3 class="login_title">用户注册</h3>
            <el-form-item>
                <el-input type="text" v-model="loginForm.username"
                          prefix-icon="el-icon-user"
                          size="small"
                          auto-complete="off" placeholder="账号">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password"
                          prefix-icon="el-icon-unlock"
                          size="small"
                          auto-complete="off" placeholder="密码">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           style="width: 100%;background: #505458;border: none"
                           v-on:click="register"
                           size="medium"
                >
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>

    export default {
        name: 'Register',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loading:false
            }
        },
        methods: {
            register () {
                var _this = this
                this.$axios
                    .post('/register', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            this.$alert('注册成功', '提示', {
                                confirmButtonText: '确定'
                            })
                            _this.$router.replace('/login')
                        } else {
                            this.$alert(resp.data.message, '提示', {
                                confirmButtonText: '确定'
                            })
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
    .login-container{
        background:url("../assets/login.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    .login-form {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 60px auto;
        width: 280px;
        padding: 30px 40px 15px 40px;
        background-color: rgba(222, 220, 220, 0.3);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }
</style>