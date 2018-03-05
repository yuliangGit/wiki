/**
 * Created by yuliang on 2017/8/11.
 /**
 * Created by WangJie on 2018/01/08
 * 添加 page 字段，表示 弹出方式，侯哥说紧急弹窗的行为上报都要传此参数，故添加2.0版本
 * 对应字段如下：
 * 弹出量（点击大信封）  envelope_b
 * 弹出量（点击小信封）  envelope_s
 * 弹出量（点击预览）    envelope_p
 * 弹出量（Toast机制）   force_toast
 */
function initEventData(reportInfo = {}, totalPage, page) {
    return {
        /* 按钮名 */
        btnName: {
            speed: 'speed', // 加速按钮
            check: 'check', // 体检
            bgImg: 'bgImg', // 背景图
            setting: 'setting', // 设置
            notDisturb: 'notDisturb', // 不再提醒
            dislike: 'dislike', // 不喜欢
            dislike_style: 'dislike_style', // 不喜欢弹窗样式
            dislike_always: 'dislike_always', // 不喜欢总是弹出
            uninterested: 'uninterested', // 不感兴趣
            adImg: 'adImg', // 点击广告
        },
        // 页面展示
        show(route, params = {}) {
            if(page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'show',
                    action: page=='force_toast'?'auto':'artificial',
                    params: params,
                    reportInfo,
                    page: page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'show',
                action: 'auto',
                params: params,
                reportInfo
            }
        },
        // 点击关闭按钮关闭
        btnClose(route, params = {}) {
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'close',
                    action: 'artificial',
                    params: params,
                    reportInfo,
                    page:page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'close',
                action: 'artificial',
                params: params,
                reportInfo
            }
        },
        // 自动关闭
        autoClose(route, params = {}) {
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'close',
                    action: 'auto',
                    params: params,
                    reportInfo,
                    page: page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'close',
                action: 'auto',
                params: params,
                reportInfo
            }
        },
        // 点击事件
        click(route, params = {}) {
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'click',
                    action: 'artificial',
                    params: params,
                    reportInfo,
                    page: page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'click',
                action: 'artificial',
                params: params,
                reportInfo
            }
        },
        scan(route, params) {
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'scan',
                    action: 'artificial',
                    params,
                    reportInfo,
                    page:page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'scan',
                action: 'artificial',
                params,
                reportInfo
            }
        },
        // 图片错误
        imgErr(route, url, params = {}) {
            params.imgUrl = url;
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'error',
                    action: 'img',
                    params: params,
                    reportInfo,
                    page: page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'error',
                action: 'img',
                params: params,
                reportInfo
            }
        },
        // 接口错误
        httpErr(route, url, params = {}) {
            params.errorUrl = url;
            if (page) {
                return {
                    totalPage: totalPage,
                    route: route,
                    actiontype: 'error',
                    action: 'http',
                    params: params,
                    reportInfo,
                    page:page
                }
            }
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'error',
                action: 'http',
                params: params,
                reportInfo
            }
        },
    }
}

export default initEventData
