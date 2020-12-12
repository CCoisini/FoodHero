<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading'>
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Waterfall',
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
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>