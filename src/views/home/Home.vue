<template>
  <div class="home">
    <!-- 轮播 start -->
    <el-carousel :interval="5000" type="card" height="300px">
      <el-carousel-item>
        <!--/detail?menuId=5d83bfba2f7cb93a4009cf98-->
        <router-link>
          <img 
            src=""
            width="100%"
            alt=""
          >
        </router-link>
      </el-carousel-item>
      <el-carousel-item>
        <!--/detail?menuId=5d83bfba2f7cb93a4009cf98-->
        <router-link>
          <img
                  src=""
                  width="100%"
                  alt=""
          >
        </router-link>
      </el-carousel-item>
      <el-carousel-item>
        <!--/detail?menuId=5d83bfba2f7cb93a4009cf98-->
        <router-link>
          <img
                  src=""
                  width="100%"
                  alt=""
          >
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播 end -->
    <!-- 内容精选 瀑布流形式 start -->
    <div>
      <h2>内容精选</h2>
      <!-- :info='info' -->
      <waterfall ref="waterfall">
        <menu-card :margin-left="13" :info="menuList"></menu-card>
      </waterfall>
    </div>
    <!-- 内容精选 瀑布流形式 end -->
  </div>
</template>

<script>
import MenuCard from '@/components/menu-card.vue'
import Waterfall from '@/components/waterfall.vue'
// 引入 注册 使用
export default {
  name: 'home',
  components: {
    MenuCard: MenuCard,
    Waterfall
  },
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
.home 
  h2
    text-align center
    padding 20px 0;

  .el-carousel__item h3 
    color #475669
    font-size 14px
    opacity 0.75
    line-height 200px
    margin 0
  

  .el-carousel__item:nth-child(2n) 
    background-color #99a9bf
  

  .el-carousel__item:nth-child(2n+1) 
    background-color #d3dce6
  
</style>

