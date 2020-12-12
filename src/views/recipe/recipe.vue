<template>
    <div class="recipe">
        <!-- v-model="activeName" -->
        <!-- 菜谱分类 start -->
        <el-tabs v-model="name" type="border-card">
            <el-tab-pane label="菜系1">
                <div class="recipe-link">
                    <router-link :to="{}" class="active">
                        分类1
                    </router-link>
                    <router-link :to="{}">
                        分类2
                    </router-link>
                    <router-link :to="{}">
                        分类3
                    </router-link>
                </div>
            </el-tab-pane>
            <el-tab-pane label="菜系2">
                <div class="recipe-link">
                    <router-link :to="{}" class="active">
                        分类1
                    </router-link>
                    <router-link :to="{}">
                        分类2
                    </router-link>
                    <router-link :to="{}">
                        分类3
                    </router-link>
                </div>
            </el-tab-pane>
            <el-tab-pane label="菜系3">
                <div class="recipe-link">
                    <router-link :to="{}" class="active">
                        分类1
                    </router-link>
                    <router-link :to="{}">
                        分类2
                    </router-link>
                    <router-link :to="{}">
                        分类3
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
                    <el-collapse v-model="name">
                        <el-collapse-item

                                title="筛选项1"
                        >
                            <div class="filter-tags">
                                <el-tag type="info"></el-tag>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item

                                title="筛选项2"
                        >
                            <div class="filter-tags">
                                <el-tag type="info"></el-tag>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item

                                title="筛选项3"
                        >
                            <div class="filter-tags">
                                <el-tag type="info"></el-tag>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <!-- 筛选 end -->
                </div>
            </el-aside>
            <el-main class="filter-menus-box">
<!--                <div class="menu-empty">暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>-->
                <menu-card style="min-height: 75%;" :info="list"></menu-card>
                <div style="text-align: right;">
                    <el-pagination
                            style="display: inline-block;"
                            page-size="10"
                            layout="total, prev, pager, next"
                            :total="50">
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
        data() {
            return {

            }
        },
        watch: {
            $route: {

            }
        },
        mounted() {

        },
        methods: {

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
            background-color #ff3232
            color #fff

    .menu-empty
        width 100%
        text-align center
        font-size 20px
</style>

