<template>
  <div class="create">
    <h2>欢迎发布新菜谱，先介绍一下你的大作！</h2>
    <section class="create-introduce">
      <h5>标题</h5>

      <el-input class="create-input" placeholder="请输入内容"></el-input>
      <h5>属性</h5>
      <div>
        <el-select
        >
          <el-option
          >
          </el-option>
        </el-select>
      </div>
      <h5>菜谱分类</h5>
      <div>
        <el-select placeholder="请选择菜谱分类">
          <el-option-group
            >
            <el-option
              >
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <h5>成品图 (328*440)</h5>
      <div class="upload-img-box clearfix">
        <div class="upload-img">
          <upload-img

          ></upload-img>
        </div>
        <el-input
          class="introduce-text"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"

        >
        </el-input>
      </div>
    </section>

    <h2>记录所有原材料</h2>
    <section class="create-introduce">
      <h5>主料</h5>
      <!--[ { "name": "", "specs": "" }, { "name": "", "specs": "" }, { "name": "", "specs": "" } ]-->
      <Stuff 

      ></Stuff>
      <h5>辅料</h5>
      <Stuff 

      ></Stuff>
    </section>

    <h2>开始写步骤了！能否简单易学就看你怎么写了，加油！</h2>
    <section class="create-introduce">
      <Upload 

      ></Upload>
      <el-button 
        class="eaeaea add-step-button" 
        type="primary" 
        size="medium" 
        icon="el-icon-plus"

      >增加一步</el-button>
      <h5>烹饪小技巧</h5>
      <el-input
        class="introduce-text"
        type="textarea"
        :rows="8"
        placeholder="分享下你做这道菜的过程中的心得和小技巧吧！"

      >
      </el-input>
    </section>

    <el-button 
      class="send" 
      type="primary" 
      size="medium" 
      :icon="icon"

    >搞定，提交审核</el-button>

  </div>
</template>
<script>
import Stuff from './stuff'
import Upload from './step-upload'
import UploadImg from '@/components/upload-img'
import {getProperty, getClassify, publish} from '@/service/api'

export default {
  name: 'create',
  components: {Stuff,Upload,UploadImg},
  data(){
    return {

    }
  },
  mounted(){

  },
  methods:{


  }
}
</script>
<style lang="stylus">

.create-introduce 
  background-color #fff
  padding 20px

  .add-step-button
    margin-left 100px

.create
  width 100%
  h2
    text-align center
    margin 20px 0
  .send
    // ff3232()
    height: 70px;
    width: 220px;
    background #ff3232
    color #fff
    border none
    margin 20px auto
    display block
    

  h5 
    margin 20px 0

.create-input input
  width 446px
  line-height 22px
.upload-img-box 
  .upload-img
    float left
  .introduce-text
    float left
  .el-textarea
    width 60%
    margin-left 10px



</style>


