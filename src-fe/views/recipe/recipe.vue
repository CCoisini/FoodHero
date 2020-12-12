<template>
  <div class="recipe">
    <!-- v-model="activeName" -->
    <!-- 菜谱分类 start -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabClickHandle">
      <el-tab-pane 
        :label="item.parent_name" 
        v-for="item in classifies" 
        :key="item.parent_type"
        :name="item.parent_type"
      >
        <div class="recipe-link">
          <router-link 
            :to="{query:{...$route.query, classify: option.type, page: 1}}" 
            :class="{active: classifyType === option.type}" 
            v-for="option in item.list" 
            :key="option.type"
          >
            {{option.name}}
          </router-link>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 菜谱分类 end -->
    <h2>家常好味道，给你家一般的温暖</h2>
    <el-container>
      <el-aside width="220px" class="recipe-aside">
        <div class="filter-box">
          <h4>筛选</h4>
          <!-- v-model="activeName" -->
          <!-- 筛选 start -->
          <el-collapse v-model="propertiesActivName">
            <el-collapse-item 
              v-for="item in properties"
              :key="item.parent_type"
              :title="item.parent_name"
              :name="item.parent_type"
            >
              <div class="filter-tags">
                <el-tag 
                  type="info" 
                  v-for="option in item.list" 
                  :key="option.type"
                  :class="{'tag-selected': propertiesTypes[item.title] === option.type}"
                  @click="selectedTag(option)"
                >
                  {{option.name}}
                </el-tag>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 筛选 end -->
        </div>
      </el-aside>
      <el-main class="filter-menus-box">
        <div class="menu-empty" v-show="!list.length && !loading">暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>
        <!-- :info='menus' -->
        <menu-card style="min-height: 75%;" :info="list"></menu-card>
        <div style="text-align: right;" v-show="!loading">
          <el-pagination
            :hide-on-single-page= "pages.totalPages === 1 || !list.length"
            @size-change="changePage"
            @current-change="changePage"
            :current-page.sync="pages.currentPage"
            style="display: inline-block;"
            :page-size="pages.pageSize"
            layout="total, prev, pager, next"
            :total="pages.total">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MenuCard from '@/components/menu-card.vue'
import {getClassify, getProperty, getMenus} from '@/service/api';

export default {
  components: {MenuCard},
  data(){
    return {
      activeName: '1',
      classifyType: '', // 记录菜谱分类的类型
      classifies: [],  // 菜谱分类
      properties: [], // 属性分类
      propertiesActivName: [],  // 记录多个属性分类
      propertiesTypes:{},  // 记录属性的分类，有多个  {a:'1-2',b:'2-1'}
      list: [],
      pages:{
        pageSize: 0,
        total: 0,
        currentPage: 0,
        totalPages: 0
      },
      loading: false
    }
  },
  watch:{
    $route: {
      handler(){
        const {classify} = this.$route.query;
        if(classify){  // classify : 1-2
          this.activeName = classify[0];
          this.classifyType = classify;
          this.getMenus();  // 执行这里的时候，mounted不一定执行，元素就不存在
        }
      },
      immediate: true
    }
  },
  mounted(){
    getClassify().then((data) => {
      this.classifies = data.data;
      // 拿到数据之后，需要把一些标识赋值成第一个数据
      if(!this.$route.query.classify){
        this.activeName = this.classifies[0].parent_type;
        this.classifyType = this.classifies[0].list[0].type;
        this.$router.push({
          query: {
            classify: this.classifyType,
            page: 1
          }
        })
      }
    })

    getProperty().then((data) => {
      this.properties = data.data;
      // craft=1-1&flavor=2-1&hard=3-2
      const {query} = this.$route;  // {craft:'1-1',flavor: '2-1',hard: '3-2' }
      this.propertiesTypes = this.properties.reduce((o, item) => {
        o[item.title] = query[item.title] ? query[item.title] : '';
        if(o[item.title]){
          this.propertiesActivName.push(o[item.title][0]);
        }
        return o;
      },{});
      console.log(this.propertiesTypes);
    })
  },
  methods:{
    changePage(){
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.pages.currentPage
        }
      })
    },
    getMenus(){
      const query = {...this.$route.query};
      const params = {
        page: query.page || 1,
        classify: query.classify
      }
      delete query.page;
      delete query.classify;
      if(Object.keys(query).length){
        params.property = {
          ...query
        }
      }
      console.log(params)
      
      // 调用loading
      let loading = null;
      this.$nextTick(() => {
        loading = this.$loading({
          target: '.filter-menus-box',
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      })
      this.list = [];  // 每次请求之前都清空
      this.loading = true;
      getMenus(params).then((data) => {
        console.log(data)
        this.list = data.data.list;
        this.pages.pageSize = data.data.page_size;
        this.pages.total = data.data.total;
        this.pages.currentPage = data.data.current_page;
        if(loading) loading.close();
        this.loading = false;
        this.pages.totalPages = Math.ceil(this.pages.total/this.pages.pageSize);
      })

    },
    tabClickHandle(tab, event){
      const activeName = this.activeName;  // 切换的tab
      // 找到切换到的tab数据的的list的第一个
      const item = this.classifies.find(item => item.parent_type === activeName);
      if(item){
        this.classifyType = item.list[0].type;
        this.$router.push({
          query: {
            ...this.$route.query,
            classify: item.list[0].type,
            page: 1
          }
        })
      }
    },
    // 点击属性分类
    selectedTag(option){
      let query = {...this.$route.query};
      if(this.propertiesTypes[option.title] === option.type) {
        this.propertiesTypes[option.title] = '';
        delete query[option.title];
      }else {
        this.propertiesTypes[option.title] = option.type;
         query[option.title] = option.type;
      }
      // 地址栏记录选中的属性
      this.$router.push({
        query
      })
    }
  }
}
</script>
<style lang="stylus">
  .recipe-link
    font-size 0;
    margin-top 5px
    a
      display inline-block
      font-size 12px
      padding 0px 8px
      height 28px
      line-height 28px
    .active 
      background #ff3232
      color #fff
  .recipe
    h2 
      text-align center
      line-height 150px
    .el-main
      padding 0
    .filter-box 
      background #fff
      padding 10px
      width 100%
      float left
      box-sizing border-box
  .filter-tags 
    display flex
    flex-wrap wrap
    justify-content space-around
    .tag-selected
      background-color  #ff3232
      color #fff
  .menu-empty
    width 100% 
    text-align center
    font-size 20px
</style>

