/**
 * Created by yuliang on 2017/8/11.
 */
function initEventData(reportInfo = {}, totalPage) {
    return {
        // 页面展示
        show(route, params = {}) {
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'show',
                action: 'auto',
                params: params,
                reportInfo
            }
        },
        // back键关闭
        escClose(route, params = {}) {
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'close',
                action: 'esc',
                params: params,
                reportInfo
            }
        },
        // 点击空白关闭
        bodyClose(route, params = {}) {
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'close',
                action: 'body',
                params: params,
                reportInfo
            }
        },
        // 自动关闭
        autoClose(route, params = {}) {
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
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'click',
                action: 'artificial',
                params: params,
                reportInfo
            }
        },
        autoClick(route, params = {}) {
            return {
                totalPage: totalPage,
                route: route,
                actiontype: 'click',
                action: 'auto',
                params: params,
                reportInfo
            }
        },
        scan(route, params) {
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
