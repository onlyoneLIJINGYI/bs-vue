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
                <el-button type="primary"
                           style="width: 40%;background: #505458;border: none"
                           v-on:click="login"
                           size="medium"
                >
                    登录
                </el-button>
                <router-link to="register"><el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button></router-link>
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
                responseResult: []
            }
        },
        methods: {
            login () {
                this.$axios
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        console.log(successResponse)
                        if (successResponse.data.code === 200) {
                            alert('登录成功')
                            this.$store.commit('login',this.loginForm)
                            //使用router.replace而不使用router.push方法，replace不会向history 添加新记录，即替换当前路由，当浏览器后退时不会再后退到login路由
                            //获取进入当前login路由前上一个路由，登录成功重新跳转到该路由，不存在则跳转到home路由下
                            var path=this.$route.query.redirect
                            this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
                        }else if(successResponse.data.code === 400){
                            console.log('密码错误，请重新登录')
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