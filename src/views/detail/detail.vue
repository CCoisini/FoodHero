<template>
  <div class="menu-detail">
    <detail-header></detail-header>
    <detail-content></detail-content>
    <Comment></Comment>
  </div>
</template>
<script>
import DetailHeader from './detail-header'
import DetailContent from './detail-content'
import Comment from './comment'
import {menuInfo} from '@/service/api';
export default {
  components: {DetailHeader, DetailContent, Comment},
  data(){
    return {

    }
  },
  watch:{

  }
}
</script>
