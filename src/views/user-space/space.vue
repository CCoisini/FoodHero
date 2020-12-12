<template>
  <div class="space">
    <h2>欢迎来到我的美食空间</h2>
    <div class="user-info">
      <div class="user-avatar">
        <img src="" alt="">
      </div>
      <div class="user-main">
        <h1></h1>
        <span class="info">
          <em>加入美食杰</em>
          |
          <router-link to="" >编辑个人资料</router-link>
        </span>
        <div class="tools" >
          <!-- follow-at  no-follow-at-->
				  <a href="javascript:;" class="follow-at"
          >
            关注
          </a>
        </div>
      </div>

      <ul class="user-more-info">
        <li>
          <div>
            <span>关注</span>
            <strong>77</strong>
          </div>
        </li>
        <li>
          <div>
            <span>粉丝</span>
            <strong>44</strong>
          </div>
        </li>
        <li>
          <div>
            <span>收藏</span>
            <strong>11</strong>
          </div>
        </li>
        <li>
          <div>
            <span>发布菜谱</span>
            <strong>55</strong>
          </div>
        </li>
      </ul>
    </div>

    <!-- v-model="activeName" -->
    <el-tabs class="user-nav">
      <el-tab-pane label="作品" name="works"></el-tab-pane>
      <el-tab-pane label="粉丝" name="fans"></el-tab-pane>
      <el-tab-pane label="关注" name="following"></el-tab-pane>
      <el-tab-pane label="收藏" name="collection"></el-tab-pane>
    </el-tabs>

    <div class="user-info-show">
      <!-- 作品 & 收藏 布局 -->
      <!-- <menu-card :margin-left="13"></menu-card> -->
      <!-- 粉丝 & 关注 布局 -->
      <!-- <Fans></Fans> -->
      <router-view ></router-view>
    </div>

  </div>
</template>
<script>
import {userInfo, toggleFollowing, getMenus, following, fans, collection} from '@/service/api';

export default {
  name: 'Space',
  data(){
    return {

    }
  },
  watch:{

  },
  methods:{

  }
}
</script>

<style lang="stylus">
.space
  
  h2
    text-align center
    margin 20px 0
  .user-info
    height 210px
    background-color #fff
    display flex
    .user-avatar
      width 210px
      height 210px
      
      img 
        width 100%
        height 100% 
    .user-main
      width 570px
      padding 20px
      position relative
      h1
        font-size 24px
        color #333
        line-height 44px
      .info  
        font-size 12px
        line-height 22px
        color #999
        a
          color #999
      .tools 
        position absolute
        right 20px
        top 20px
        vertical-align top;
        a
          display inline-block
          padding 3px 0
          width 50px
          color #fff
          text-align center
        a.follow-at
          background-color  #ff3232
        a.no-follow-at 
          background-color #999
          
    .user-more-info
      width 190px
      overflow hidden
      padding-top 20px
      li
        width 81px
        height 81px
        border-radius 32px
        border-bottom-right-radius 0
        margin 0px 8px 8px 0px
        float left
        div
          display block
          height 81px
          width 81px
          box-shadow 0px 0px 6px rgba(0,0,0,0.05) inset
          border-radius 32px
          border-bottom-right-radius 0

          span 
            color #999
            line-height 20px
            display block
            padding-left 14px
            padding-top 14px

          strong 
            display block
            font-size 18px
            color #ff3232
            font-family Microsoft Yahei
            padding-left 14px
            line-height 32px

  .user-nav
    margin 20px 0 20px 0
  .user-info-show
    min-height 300px
    background #fff
    padding-top 20px
    .info-empty
      width 100% 
      min-height inherit
      display flex
      align-items center
      justify-content:center;
      p 
        text-align center
        font-size 12px
      a 
        text-align center
        display block
        height 48px
        width 200px
        line-height 48px
        font-size 14px
        background #ff3232
        color #fff
        font-weight bold
        margin 0px auto
  .el-tabs__item.is-active 
    color: #ff3232;
  .el-tabs__active-bar
    background-color: #ff3232;
  .el-tabs__nav-wrap::after
    background-color: transparent;
</style>

