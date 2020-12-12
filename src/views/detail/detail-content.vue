<template>
  <section class="detail-content">
    <div class="detail-materials">
      <p class=""><strong>“</strong>这道菜的描述<strong>”</strong></p>
      <h2>用料</h2>
      <div class="detail-materials-box clearfix">
        <h3>主料</h3>
        <ul>
          <li class="">
            食材
            <span>适量</span>
          </li>
        </ul>
      </div>
      <div class="detail-materials-box clearfix">
        <h3>辅料</h3>
        <ul>
          <li class="">
            盐
            <span>适量</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail-explain">
      <h2>菜的做法</h2>
      <section class="detail-section clearfix">
        <em class="detail-number">1.</em>
        <div class="detail-explain-desc">
          <p>步骤1</p>
          <img class="conimg" src="" alt="">
        </div>
      </section>
      <div class="skill">
        <h2>烹饪技巧</h2>
        <p>先这样，然后再这样，最后这样，出锅！妙啊~</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'DetailContent',
  props:{

  }
}
</script>
<style lang="stylus">
.detail-content
  margin-top 20px
  h2 
    font-size 24px
    color #333
    height 66px
    line-height 66px
    border-bottom 1px solid #eee
    text-indent 24px
    font-family Microsoft Yahei
    display block
  .detail-materials
    background-color #fff
    > p 
      line-height 24px
      font-size 14px
      padding 20px 24px 10px
      color #666
    .detail-materials-box
      margin-bottom 20px
      h3 
        width 48px
        height 22px
        color #999
        background #f5f5f5
        border 1px solid #ddd
        text-align center
        line-height 24px
        margin 14px 5px 14px 25px
        float left
      ul 
        float left
        width 910px
        li 
          float left
          box-sizing border-box
          height 54px
          line-height 54px
          margin 0 5px 5px 5px
          padding 0 10px
          border 1px solid #eee
  .detail-explain
    background-color #fff
    padding-bottom 20px
    .detail-section
      .detail-number
        font-size 50px
        color #ff3232
        font-style italic
        text-align center
        font-family arial
        height 50px
        width 100px
        display block
        float left
        line-height 50px
      .detail-explain-desc
        float left
        width 650px
        overflow hidden
        p 
          line-height 24px
          color #666
          padding 10px 20px 10px 0px
          position relative
          font-size 14px
        img 
          max-width 550px
    .skill
      p 
        font-size 12px
        padding-left 100px
        padding-top 10px
</style>

