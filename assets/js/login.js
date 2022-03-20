$(function() {
    // 请求的根接口地址
    // const api = 'http://www.liulongbin.top:3007'
    // const Api = 'http://api-breakingnews-web.itheima.net'

    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击“去登录”的链接
    $('#link_login').on('click', function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        // 从layui中获取 form 对象
    let form = layui.form
        // layui中获取弹出层(layer)对象
    let layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能有空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码中的内容
            //还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示信息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 阻止默认的提交行为
            e.preventDefault();
            // 向服务器发送的数据
            const data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
                // 发起ajax请求
            $.post('/api/reguser', data, function(res) {
                // 判断返回的状态是否等于0，不等于0 就return出去
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg(res.message)

                }
                // 否则注册成功
                // console.log('注册成功!');
                layer.msg('注册成功，请登录')
                    // 模拟人的点击事件
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                    // 将登录成功得到token的字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})