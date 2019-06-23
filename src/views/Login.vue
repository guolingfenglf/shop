<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="../assets/logo.png" alt>
     
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
                </el-form-item>
                <div>
                    <el-button @click="loginSubmit" type="primary">登录</el-button>
                    <el-button>重置</el-button>
                </div>
            </el-form>
    </div>
  </div>
</template>
<script>
export default {
        data() {
        return {
        loginForm: {
          username: '',
          passward:''  
        },
        loginRules: {
          username: [
            { required: true,message:'账号不能为空', trigger: 'blur' }
          ],
          passward: [
            { required: true,message:'密码不能为空', trigger: 'blur' }
          ]
        }
      };
    
    },
    methods: {
        loginSubmit(){
          this.$refs.loginForm.validate(async  (e)=> { 
            if (e) {
              const {data:res}=await this.axios.post('/login', this.loginForm)
                    if(res.meta.status != 200) return this.$message.error('用户名或者密码错误')
                    sessionStorage.setItem('token',res.data.token)
                    this.$router.push('/')
            }
           })
        }
    },
};
</script>
<style>
.login {
  height: 100%;
  width: 100%;
  background-color: #294a69;
}
.login .login-box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login .login-box .logo {
  border-radius: 50%;
  width: 130px;
  height: 130px;
  border: 7px solid #fff;
  box-shadow: 0 0 10px #ccc;
  background-color: #eee;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translate(-50%, -50%);
}
.login-box .el-form {
    width: 100%;
    padding: 0 20px 30px 20px;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    text-align: right;
}
.login-box .el-input {
    margin-bottom: 20px;
}
</style>
