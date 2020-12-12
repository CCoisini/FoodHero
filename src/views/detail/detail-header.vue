<template>
  <section class="detail-header">
    <img class="detail-img" src="" />
    <div class="detail-header-right">

      <div class="detail-title clearfix">
          <h1 class="title">菜品名称</h1>
          <!--
            1. 不显示，这个菜谱是当前用户发布的
            2. 显示，后端返回一个是否收藏的字段
          -->
          <div class="detail-collection" v-if="!isOnwer">
            <!-- collection-at  no-collection-at-->
            <a 
              href="javascript:;" 
              class="collection-at"
            > 
                收藏
            </a>
          </div>
      </div>
      
      <ul class="detail-property clearfix">
        <li>
          <strong></strong>
          <span></span>
        </li>
      </ul>

      <div class="user">
        <router-link id="tongji_author_img" class="img" to="">
          <img src="">
        </router-link>
        <div class="info">
          <h4>
            <router-link id="tongji_author"  to="">

            </router-link>
          </h4>
          <span>菜谱：菜谱/　关注：关注量　/　粉丝：粉丝量</span>
          <strong>2020-01-01</strong>
        </div>
      </div>

    </div>
  </section>
</template>
<script>
import {toggleCollection} from '@/service/api'
export default {
  props:{
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {

  },
  methods:{

  }
}
</script>

<style lang="stylus">
.detail-header
  margin-top 40px
  display flex
  background-color #fff
  .detail-img
    width 328px
  .detail-header-right
    width 662px
    
    .detail-title
      box-sizing border-box
      width 100%
      padding-left: 25px;
      border-bottom: 1px solid #eee;
      .title
        max-width: 288px;
        height: 44px;
        padding: 28px 0px;
        line-height: 44px;
        font-size: 36px;
        color: #333;
        float left
      .collected
        background: #999;
      .collecte
        background: #ff3232;
      .detail-collection
        float right
        display block
        height: 50px;
        line-height: 44px;
        color #fff
        padding: 0px 14px;
        text-align center
        
        margin-top 25px
        cursor pointer
        a 
          display: inline-block;
          padding: 3px 0;
          width: 50px;
          color: #fff;
          text-align: center;
          line-height 20px
        .collection-at
          background-color: #ff3232;
        .no-collection-at
          background-color: #999;
    
    .detail-property
      margin-left 2px
      overflow hidden
      li 
        width 199px
        float left
        height 48px
        border-right 1px solid #eee
        padding 18px 0px 18px 20px
        border-bottom 1px solid #eee
        strong 
          color #999
          line-height 18px
          display block
          height 18px
        span 
          display block
          font-size 24px
          color #ff3232
          line-height 30px
          width 100px
        
    .user
      height 70px
      padding 20px 0px 20px 20px
      overflow hidden
      font-size 12px
      a.img
        display block
        height 70px
        width 70px
        float left
        position relative
        border-radius 35px
        overflow hidden
        img
          display block
          height 70px
          width 70px
      .info
        float left
        padding-left 10px
        height 70px
      h4
        height 22px
        line-height 22px
        font-size 14px
        color #ff3232
        position relative
        a
          color #ff3232
          display inline-block
          vertical-align top
          padding-right 0px
          height 22px
      span 
        line-height 24px
        display block
        color #666
        padding-top 4px
      strong 
        line-height 22px
        color #999


</style>
