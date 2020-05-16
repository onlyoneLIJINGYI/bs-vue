<template>
    <div>
<!--        <i class="el-icon-circle-plus-outline"  @click="dialogFormVisible = true"></i>-->
        <el-dialog
                :title="title+'资源'"
                :visible.sync="dialogFormVisible"
                :modal-append-to-body='false'
                @close="clear">
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="名字" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="form.title" autocomplete="off" placeholder="请输入资源标题"></el-input>
                </el-form-item>
                <el-form-item label="难度等级" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时长" :label-width="formLabelWidth" prop="date">
                    <el-input v-model="form.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="来源网站" :label-width="formLabelWidth" prop="press">
                    <el-input v-model="form.press" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
                    <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
                    <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
                    <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
                    <el-select v-model="form.category.id" placeholder="请选择分类">
                        <el-option label="JavaScript" value="1"></el-option>
                        <el-option label="CSS3" value="2"></el-option>
                        <el-option label="Java" value="3"></el-option>
                        <el-option label="Vue.js" value="4"></el-option>
                        <el-option label="Android" value="5"></el-option>
                        <el-option label="数据结构" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="id" style="height: 0">
                    <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ImgUpload from './ImgUpload'
    export default {
        name: 'EditForm',
        components:{
          ImgUpload
        },
        data () {
            return {
                dialogFormVisible: false,
                title:'',
                form: {
                    id: '',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    category: {
                        id: '',
                        name: ''
                    }
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            clear () {
                //关闭对话框时清除表单数据
                this.form = {
                    id: '',
                    title: '',
                    author: '',
                    date: '',
                    press: '',
                    cover: '',
                    abs: '',
                    category: {
                        id: '',
                        name: ''
                    }
                }
            },
            onSubmit () {
                this.$axios
                    .post('/books', {
                        id: this.form.id,
                        cover: this.form.cover,
                        title: this.form.title,
                        author: this.form.author,
                        date: this.form.date,
                        press: this.form.press,
                        abs: this.form.abs,
                        category: this.form.category
                    }).then(resp => {
                    if (resp && resp.status === 200) {
                        this.cancel()
                        this.$emit('onSubmit')
                    }
                })
            },
            uploadImg () {
                this.form.cover = this.$refs.imgUpload.url
            },
            cancel(){
                //编辑框点击取消按钮时，隐藏编辑框，并调用imgUpload组件实例的clear方法，清空没有成功上传的文件
                this.dialogFormVisible = false
                this.$refs.imgUpload.clear()
            }

        }
    }
</script>

<style scoped>
    .el-icon-circle-plus-outline {
        margin: 50px 0 0 20px;
        font-size: 100px;
        float: left;
        cursor: pointer;
    }
    /deep/ .el-dialog{
        box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
        background-color: #f6f7f7;
    }
</style>


