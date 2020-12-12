<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    >
    <img :src="url" :style="{maxWidth: imgMaxWidth + 'px'}" />
  </el-upload>
</template>
<script>
export default {
  props:{
    action: String,
    maxSize: {
      type: Number,
      default: 2
    }, // 2M
    imageUrl: {
      type: String,
      default: ''
    },
    imgMaxWidth:{  // 设置的最大宽度
      type: [Number, String],
      default: 'auto'
    }
  },
  data(){
    return {
      url: this.imageUrl
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(res.code === 1){
        this.$message({
          message: res.mes,
          type: 'warning'
        });
        return;
      }
      this.url = URL.createObjectURL(file.raw);
      this.$emit('res-url', {
        resImgUrl: res.data.url
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < this.maxSize;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>