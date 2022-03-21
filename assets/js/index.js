$(function() {
        // 调用getUserInfo获取用户基本信息
        getUserInfo()
            // 导入layui中弹出层中的询问api
        let layer = layui.layer
            // 点击退出
        $('#btnLogout').on('click', function() {
            // 提供用户是否退出
            layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function(index) {
                // 1.清空本地的token
                localStorage.removeItem('token')
                    // 2.并跳转到登录页面
                location.href = '/login.html'
                    // 这是关闭弹出框
                layer.close(index);
            });

        })

    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象(在baseAPI中配置了请求头)
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败!')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 强制清空本地token
        //     localStorage.removeItem('token')
        //         // 并强制跳转登录页面
        //     location.href = '/login.html'
        // }
        // }

    })
}
// 渲染函数
function renderAvatar(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html(`欢迎${name}`)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染用户图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染用户文字头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}