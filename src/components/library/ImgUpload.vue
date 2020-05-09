<template>
    <!--图片上传组件，使用element提供的el-upload组件，action 属性指定了上传操作对应的 api，
     multiple和 :limit 属性可以检测上传文件的数量，
     :on-success 定义上传成功后触发的事件，触发父组件 EditForm.vue 的 onUpload 事件，把接收到的 URL 赋给图书信息表单的 cover 字段，这个 URL 需要我们在后端根据资源存放位置生成。提交后，数据库里就会保存服务器上的资源对应的 URL。
    -->
    <el-upload
            class="img-upload"
            ref="upload"
            action="http://localhost:8443/api/covers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        name: 'ImgUpload',
        data () {
            return {
                fileList: [],
                url: ''
            }
        },
        methods: {
            handleRemove (file, fileList) {
                console.log(file,fileList)
            },
            handlePreview (file) {
                console.log(file)
            },
            handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response) {
                this.url = response
                this.$emit('onUpload')
                this.$message.warning('上传成功')
            },
            //清空上传的文件列表，下次打开编辑框不会显示上次上传的文件
            clear () {
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>
