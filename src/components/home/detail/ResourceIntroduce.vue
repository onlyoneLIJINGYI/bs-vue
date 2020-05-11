<template>
    <div>
        <el-card class="box-card"
                 bodyStyle="padding:10px" shadow="hover">
            简介：{{resourceData.abs}}
        </el-card>
        <el-card class="box-card"
                     bodyStyle="padding:10px" shadow="hover">
                <div class="cover" @click="toResourceDetail(item)">
                    <img :src="resourceData.cover" alt="封面">
                </div>
            <el-row>
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-row>
            <el-row>
                <el-button type="danger" round>开始学习吧</el-button>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name:"ResourceIntroduce",
        data(){
            return{
                activities: [{
                    content: '课程介绍',
                    timestamp: '05:20',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: 'Java多线程概念讲解',
                    timestamp: '20:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: 'Java中常用线程方法介绍',
                    timestamp: '30:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: '3-1 Spring Bean装配之Bean的配置项及作用域',
                    timestamp: '10:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: '3-2 Spring Bean装配之Bean的生命周期',
                    timestamp: '10:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: 'IOC及Bean容器',
                    timestamp: '10:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }, {
                    content: '3-1 Spring Bean装配之Bean的配置项及作用域' ,
                    timestamp: '10:46',
                    size: 'large',
                    color: '#0bbd87',
                    icon: 'el-icon-video-play'
                }]
            }
        },
        computed:{
            resourceData () {
                return this.$store.state.resourceData
            }
        },
    }
</script>

<style scoped>
    .box-card {
        line-height: 30px;
        min-height: 130px;
        background: #fdfdfd;
        box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
        margin: 20px 0;
        padding: 25px 30px;
        border-radius: 15px;
    }

</style>