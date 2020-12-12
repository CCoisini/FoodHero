<template>
  <div class="login-section">
    <!-- :rules="rules" -->
    <el-form 
      label-position="top"
      :rules="rules"
      :model="ruleForm" status-icon 
       ref="ruleForm" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {register} from '@/service/api';
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入注册的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 在这里向后端发送登录用户名和密码
          const data = await register(this.ruleForm);
          if(data.code === 0) {
            this.$message({
              message: '恭喜你，注册成功，请登录',
              type: 'success'
            });
          }
          if(data.code === 1){
            this.$message({
              message: data.mes,
              type: 'warning'
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
