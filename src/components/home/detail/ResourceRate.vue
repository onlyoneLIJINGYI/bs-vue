<template>
    <div>
        <el-card class="box-card"
                 bodyStyle="padding:10px"
                 shadow="hover"
                 v-for="item of rateList"
                 :key="item.id"
        >
            <div class="userimg">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="rate-info">
                <div class="username">用户：{{item.user.username}}</div>
                <div class="commnent-area">{{item.comment}}</div>
            </div>
            <div class="rate-area">
                <el-rate v-model="item.rate"
                         show-text
                         @change="showRate"
                >
                </el-rate>
            </div>
        </el-card>
    </div>

</template>

<script>
    export default {
        name:"ResourceRate",
        data(){
            return {
                rateValue: null,
                rateList:[]
            }
        },
        computed:{
            resourceId () {
                return this.$store.state.resourceData.id
            }
        },
        methods:{
            showRate(){
                alert(this.rateValue)
            },
            loadRate(){
                var url = '/resource/' + this.resourceId + '/rate'
                this.$axios.get(url).then(resp=>{
                    console.log(resp)
                    if (resp.data) {
                        this.rateList = resp.data
                    }
                })
            }
        },
        mounted(){
            this.loadRate()
        }
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
    .userimg{
        display: inline-block;
        margin-right:20px;
    }
    .rate-info{
        display: inline-block;
        width:70%;
    }
    .rate-area{
        display: inline-block;
        margin-right:20px
    }

</style>