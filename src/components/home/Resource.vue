<template>
    <div>
        <el-row style="height: 840px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-tooltip effect="dark" placement="right"
                        v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        :key="item.id">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.author}}</span> /
                    <span>{{item.date}}</span> /
                    <span>{{item.press}}</span>
                </p>
                <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
                <!--                        style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"-->
                <el-card class="course-container"
                         bodyStyle="padding:10px" shadow="hover">
                    <div class="cover" @click="toResourceDetail(item)">
                        <img :src="item.cover" alt="封面">
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.title}}</a>
                        </div>
                       <!-- <i class="el-icon-delete" @click="deleteBook(item.id)"></i>-->
                    </div>
                    <div class="author">{{item.author}}</div>
                </el-card>
            </el-tooltip>
        </el-row>
        <el-row>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :total="books.length">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    import SearchBar from './SearchBar'
    export default {
        name: 'Books',
        components: { SearchBar},
        data () {
            return {
                books: [],
                currentPage: 1,
                pagesize: 17
            }
        },
        mounted: function () {
            this.loadBooks()
        },
        methods: {
            loadBooks () {
                var _this = this
                this.$axios.get('/books').then(resp => {
                    if (resp && resp.status === 200) {
                        _this.books = resp.data
                    }
                })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
                console.log(this.currentPage)
            },
            searchResult () {
                var _this = this
                this.$axios
                    .get('/search?keywords=' + this.$refs.searchBar.keywords).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.books = resp.data
                        console.log(resp.data)
                    }
                })
            },
            toResourceDetail(item){
                console.log(item)
                this.$router.push({ path: `/detail` })
                this.$store.commit('resouceDetail',item)
                console.log(item)
            }
        }
    }
</script>
<style scoped>

    .course-container{
        width: 269px;
        margin-bottom: 20px;
        height: 235px;
        float: left;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
        margin-right: 15px;
    }
    .cover {
        width: 250px;
        height: 165px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 5px;
    }

    img {
        width: 250px;
        height: 165px;
    }

    .title {
        font-size: 14px;
        text-align: left;
        margin: 10px 0;
    }

    .author {
        color: #333;
        width: 102px;
        font-size: 13px;
        margin-bottom: 6px;
        text-align: left;
    }

    .abstract {
        display: block;
        line-height: 17px;
    }

    .el-icon-delete {
        cursor: pointer;
        float: right;
    }

    .switch {
        display: flex;
        position: absolute;
        left: 780px;
        top: 25px;
    }

    a {
        text-decoration: none;
    }

    a:link, a:visited, a:focus {
        color: #3377aa;
    }

</style>

