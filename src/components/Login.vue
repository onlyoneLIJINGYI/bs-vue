<template>
    <div class="login-container">
        <el-form class="login-form" label-position="left"
                 label-width="0px">
            <h3 class="login_title">系统登录</h3>
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
                <el-radio-group v-model="radio" text-color="ccc">
                    <el-radio :label="1">普通用户</el-radio>
                    <el-radio :label="2">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           style="width: 40%;background: #505458;border: none"
                           v-on:click="login"
                           size="medium"
                >
                    登录
                </el-button>
                <router-link to="register">
                    <el-button type="primary" size="medium" style="margin-left:30px;width: 40%;background: #505458;border: none">注册</el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>

    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                responseResult: [],
                radio: 2
            }
        },
        methods: {
            login () {
                this.$axios
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(resp => {
                        if (resp.data.code === 200) {
                            this.$alert('登录成功', '提示', {
                                confirmButtonText: '确定'
                            })
                            var data = resp.data.result
                            this.$store.commit('login', data)
                            //使用router.replace而不使用router.push方法，replace不会向history 添加新记录，即替换当前路由，当浏览器后退时不会再后退到login路由
                            //获取进入当前login路由前上一个路由，登录成功重新跳转到该路由，不存在则跳转到home路由下
                            if(data=='admin'){
                                this.$router.replace({path: '/admin' })
                            }else{
                                var path=this.$route.query.redirect
                                this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
                            }
                        }else {
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
        margin: 120px auto;
        width: 360px;
        padding: 40px 35px 20px 35px;
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