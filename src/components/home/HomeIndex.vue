<template>
    <el-container>
        <el-aside style="width: 200px;margin-top: 20px">
            <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
        </el-aside>
        <el-main>
            <resource class="books-area" ref="booksArea"></resource>
        </el-main>
    </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import Resource from './Resource'

    export default {
        name: 'HomeIndex',
        components: {Resource, SideMenu},
        methods: {
            listByCategory () {
                var _this = this
                var cid = this.$refs.sideMenu.cid
                var url = 'categories/' + cid + '/resource'
                this.$axios.get(url).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.$refs.booksArea.books = resp.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .books-area {
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

