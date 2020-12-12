<template>
  <div class="login-section">
    <!-- :rules="rules" -->
    <el-form 
      label-position="top" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {register} from '@/service/api';
export default {
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
