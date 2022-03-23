$(function() {

    let layer = layui.layer
    let form = layui.form
    initArtCateList()
        // 获取文章分类列表的数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败!')
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 为添加类别按钮绑定事件
    let indexAdd = null
    $('#btnAddCate').click(function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            })
        })
        // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增文章分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增文章分类成功!')
                        // 根据索引关闭弹出层
                    layer.close(indexAdd)
                }
            })
        })
        // 给编辑按钮绑定事件
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function(e) {
            // e.preventDefault()
            // 弹出一个修改文章分类的信息的层
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '编辑',
                content: $('#dialog-edit').html()
            })
            let id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('获取文章分类数据失败！')
                    }
                    form.val('form-edit', res.data)
                }
            })
        })
        //监听弹出层的提交事件 修改文章分类
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                    // 调用渲染函数
                initArtCateList()
                    // 关闭弹出层
                layer.close(indexEdit)
            }
        })

    })

    // 给删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id')
            // 提示用户是否删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    // 调用渲染函数，重新渲染
                    initArtCateList()
                }
            })


        });

    })

})