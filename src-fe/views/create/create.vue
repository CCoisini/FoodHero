<template>
  <div class="create">
    <h2>欢迎发布新菜谱，先介绍一下你的大作！</h2>
    <section class="create-introduce">
      <h5>标题</h5>
      {{backData.title}}
      <el-input class="create-input" placeholder="请输入内容" v-model="backData.title"></el-input>
      <h5>属性</h5>
      <div>
        <el-select
          v-for="item in properties"
          :key="item.parent_type"
          :placeholder="item.parent_name"
          v-model="backData.property[item.title]"
        >
          <el-option
            v-for="option in item.list"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          >
          </el-option>
        </el-select>
      </div>
      <h5>菜谱分类</h5>
      <div>
        <el-select placeholder="请选择菜谱分类" v-model="backData.classify">
          <el-option-group
            v-for="group in classifies"
            :key="group.parent_type"
            :label="group.parent_name">
            <el-option
              v-for="item in group.list"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <h5>成品图 (328*440)</h5>
      <div class="upload-img-box clearfix">
        <div class="upload-img">
          <upload-img
            action="/api/upload?type=product"
            :image-url="backData.product_pic_url"
            @res-url="(data) => {backData.product_pic_url = data.resImgUrl}"
          ></upload-img>
        </div>
        <el-input
          class="introduce-text"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="backData.product_story"
        >
        </el-input>
      </div>
    </section>

    <h2>记录所有原材料</h2>
    <section class="create-introduce">
      <h5>主料</h5>
      <!--[ { "name": "", "specs": "" }, { "name": "", "specs": "" }, { "name": "", "specs": "" } ]-->
      <Stuff 
        v-model="backData.raw_material.main_material"
      ></Stuff>
      <h5>辅料</h5>
      <Stuff 
        v-model="backData.raw_material.accessories_material"
      ></Stuff>
    </section>

    <h2>开始写步骤了！能否简单易学就看你怎么写了，加油！</h2>
    <section class="create-introduce">
      <Upload 
        v-for="(item,index) in backData.steps" 
        :key="item.customeId"
        :n="index+1"
        v-model="backData.steps[index]"
        @remove="removeStep"
      ></Upload>
      <el-button 
        class="eaeaea add-step-button" 
        type="primary" 
        size="medium" 
        icon="el-icon-plus"
        @click="addStep"
      >增加一步</el-button>
      <h5>烹饪小技巧</h5>
      <el-input
        class="introduce-text"
        type="textarea"
        :rows="8"
        placeholder="分享下你做这道菜的过程中的心得和小技巧吧！"
        v-model="backData.skill"
      >
      </el-input>
    </section>

    <el-button 
      class="send" 
      type="primary" 
      size="medium" 
      :icon="icon"
      @click="send"
    >搞定，提交审核</el-button>

  </div>
</template>
<script>
import Stuff from './stuff'
import Upload from './step-upload'
import UploadImg from '@/components/upload-img'
import {getProperty, getClassify, publish} from '@/service/api'
// 向后端发送的数据结构
const backData = {
  title: '',  // 标题
  product_pic_url: '', // 成品图URL
  product_story: '', // 成品图故事
  property: {
    craft: 0,  // 工艺 enum: [1,2,3,4],
    flavor: 0,  // 口味  enum: [1,2,3,4],
    hard: 0,   // 难度 enum: [1,2,3,4],
    pepole: 0  // pepole 人数: [1,2,3,4],
  },  // 属性
  raw_material: { // 料
    main_material: [{name: '',specs: ''}], // 主料
    accessories_material: [{name: '',specs: ''}], // 辅料
  },
  steps: [{img_url: '',describe: '',}], // 步骤
  classify: '', // 菜谱分类
  skill: '',
}
const raw_material_struct = {
  name: '',specs: ''
}
const steps_struct = {img_url: '',describe: '',}
// 页面中展示的数据
// 用户产生的，向后端发送的数据
let n = 1;

const mockData = {
  "title": "测试数据123",
  "property": {
    "craft": "1-2",
    "flavor": "2-1",
    "hard": "3-1",
    "people": "4-1"
  },
  "classify": "1-1",
  "product_pic_url": "http://127.0.0.1:7001/static/upload/product/328X4401565628820747.jpg",
  "product_story": "1",
  "raw_material": {
    "main_material": [
      {
        "name": "1",
        "specs": "1"
      },
      {
        "name": "2",
        "specs": "2"
      },
      {
        "name": "3",
        "specs": "3"
      }
    ],
    "accessories_material": [
      {
        "name": "1",
        "specs": "3"
      },
      {
        "name": "2",
        "specs": "4"
      },
      {
        "name": "4",
        "specs": "4"
      }
    ]
  },
  "steps": [
    {
      "img_url": "http://127.0.0.1:7001/static/upload/step/210X210X21565628835530.jpg",
      "describe": "1"
    },
    {
      "img_url": "http://127.0.0.1:7001/static/upload/step/210X210X21565628839458.jpg",
      "describe": ""
    },
    {
      "img_url": "http://127.0.0.1:7001/static/upload/step/210X2101565628842198.jpg",
      "describe": "3"
    }
  ],
  "skill": "心得"
}

export default {
  name: 'create',
  components: {Stuff,Upload,UploadImg},
  data(){
    return {
      properties: [],  // 页面展示的数据
      classifies: [], 
      icon: '',
      backData: {
        title: '',
        property: {
          // craft: '',
          // flavor: ''
        },
        classify: '',
        product_pic_url: 'https://s1.c.meishij.net/n/images/upload_big_img.png?_=1561906961',
        product_story: '',
        raw_material: { // 料 
          main_material: Array(3).fill(1).map(() => ({...raw_material_struct})), // 主料  //
          accessories_material: Array(3).fill(1).map(() => ({...raw_material_struct})), // 辅料
        },
        steps: Array(3).fill(1).map(() => ({...steps_struct, customeId: this.uuid()})),
        skill: ''
      }
    }
  },
  mounted(){
    getProperty().then(({data}) => {
      this.properties = data;
      this.backData.property = data.reduce((o,item) => {
        o[item.title] = '';
        return o;
      },{});
    })
    getClassify().then(({data}) => {
      console.log(data);
      this.classifies = data;
    })
  },
  methods:{
    uuid(){
      n++;
      return Date.now() + n;
    },
    addStep(){
      this.backData.steps.push({
        ...steps_struct,
        customeId: this.uuid()
      })
    },
    removeStep(index){
      this.backData.steps.splice(index-1, 1);
    },
    send(){
      this.icon = 'el-icon-loading';
      let param = this.backData;
      // 验证
      

      // 删除字段 删除字段后，当前页面需要用到这个字段的地方可能会有问题
      // 提取出需要的字段
      param.steps = param.steps.map((item) => {
        return {
          img_url: item.img_url,
          describe: item.describe,
        }
      })
      // 1. 测试过程中不跳转，手动去打开指定的跳转的页面去看数据对不对
      // 2. mock数据，模拟一套数据，预先准备一套

      //console.log(JSON.stringify(param, null, 2));
      //param = mockData;

      publish(param).then((data) => {
        console.log(data);
        this.$router.push({
          name: 'space'
        })
      })
    }
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


