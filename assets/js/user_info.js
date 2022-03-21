$(function() {
    // 调用初始化用户的基本信息的函数
    initUserInfo()
    let form = layui.form
    let layer = layui.layer
        //定义 验证的规则
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6个字符之间'
                }
            }
        })
        // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // 调用 form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 监听表单的提交事件
    $('.layui-form').submit(function(e) {
            // 阻止表单默认行为
            e.preventDefault();
            // 发起ajax数据请求
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败！')
                    }
                    layer.msg('更新用户信息成功！')
                        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    window.parent.getUserInfo()
                }
            })
        })
        // 重置
    $('#btnReset').click(function(e) {
        e.preventDefault()
            // 调用初始化initUserInfo函数
        initUserInfo()
    })
})