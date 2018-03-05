/**
 * Created by yuliang on 2017/7/19.
 */
/*
 * bowl.js v0.1.4
 * (c) 2016-2017 classicemi
 * Released under the MIT license.
 */


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.reporter = factory());
}(this,
    (function () {
        // 代码版本
        var version = '1.0.0';


        //网页停留时间
        var second = 0;
        setTimeout(function () {
            second++;
            setTimeout(arguments.callee, 1000);
        }, 1000);

        //获取电视基本信息
        function getTvInfo() {
            if (window.android) {
                try {
                    return JSON.parse(window.android.getTvDeviceInfor());
                } catch (err) {
                    console.log(err, '获取电视信息失败');
                }
            }
        }

        //获取电脑基本信息
        function getPcInfo() {
            if (window.CallNativeMethod) {
                try {
                    return {
                        sn: CallNativeMethod('get_super_sn', ''),
                        lenovoId: CallNativeMethod('get_user_id', ''),
                        channel: CallNativeMethod('get_channel', ''),
                        login_status: CallNativeMethod('get_login_status', ''),
                        mt: CallNativeMethod('get_mt', ''),
                        version: CallNativeMethod('get_version', ''),
                        user_name: CallNativeMethod('get_real_user_name', ''),
                    };
                } catch (err) {
                    console.log(err, '获取PC信息失败');
                }
            }
        }

        // 获取基本信息
        function getbaseInfo() {
            return {
                'nowTime': new Date().getTime(),
                'dutation': second,
                'url': document.URL,
                'domain': document.domain,
                // 'cookie': document.cookie,
                'title': document.title,
                'lastmodified': document.lastModified,
                'identification': generateUUID() + '-' + new Date().getTime(),
                'user_agent': navigator.userAgent,
                'refer': document.referrer,
                'platform': navigator.platform,
                'language': navigator.language,
            }
        }

        // 将data生成query数组
        function getQueryArry(data) {
            var query = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    query.push(key + '=' + escape(data[key]))
                }
            }
            return query;
        }

        // 重写assign
        //todo 浅复制，待优化成深复制
        if (typeof Object.assign !== 'function') {
            (function () {
                Object.assign = function (target) {
                    'use strict';
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    var output = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source !== undefined && source !== null) {
                            for (var nextKey in source) {
                                if (source.hasOwnProperty(nextKey)) {
                                    output[nextKey] = source[nextKey];
                                }
                            }
                        }
                    }
                    return output;
                };
            })();
        }

        // 生成全局唯一标识符UUID
        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        // 过滤掉undefined，''，null等数据
        function dirtyObjFilterFn(obj) {
            if (obj) {
                var newObj = {};
                for (var i in obj) {
                    if (obj[i]) {
                        newObj[i] = obj[i];
                    }
                }
                return newObj
            }
        }

        // 根据设备选择不同初始化方法
        function getTypeData(type) {
            switch (type) {
                case 'TV': {
                    var data = getTvInfo() || {};
                    data.type = type;
                    return data;
                }
                case 'PHONE': {
                    var data = {};
                    data.type = type;
                    return data;
                }
                case 'PC': {
                    var data = getPcInfo() || {};
                    data.type = type;
                    return data;
                }
                default: {
                    alert('datareport:::init参数错误，请参阅api使用说明')
                }
            }
        }


        // 定义实际方法
        var lxUpData = function () {
            this.baseInfo = {};
            this.deviceInfo = {};
            this._queryData = {'jsVersion': version};
        };

        // 初始化，根据业务需求生成data
        lxUpData.prototype.init = function (type, data) {
            var _this = this;
            // 获取基础数据
            _this.baseInfo = getbaseInfo() || {};
            // 初始化不同设备信息
            _this.deviceInfo = getTypeData(type) || {};
            // 合并参数
            Object.assign(_this.deviceInfo, dirtyObjFilterFn(data));
        };

        // 上传事件方法
        lxUpData.prototype.push = function (data, cb) {
            var _this = this;
            if (typeof data === "object") {
                // 更新页面停留时间
                _this.baseInfo.dutation = second;
                // 更新当前时间
                _this.baseInfo.nowTime = new Date().getTime();


                // 将object转JSON字符串
                _this._queryData.baseInfo = JSON.stringify(_this.baseInfo);
                _this._queryData.deviceInfo = JSON.stringify(_this.deviceInfo);
                _this._queryData.eventInfo = JSON.stringify(data);

                var _dataArry = getQueryArry(_this._queryData);
                var _img = new Image();
                _img.src = '/lexreport/api/nb.gif?' + _dataArry.join('&');

                var overTimer = setTimeout(function () {
                    if (typeof cb === 'function') {
                        cb({status: 'error'})
                    }
                    clearTimeout(overTimer);
                }, 3000);

                _img.onload = function () {
                    clearTimeout(overTimer);
                    console.log('上报成功');
                    if (typeof cb === 'function') {
                        cb({status: 'success'})
                    }
                };

                _img.onerror = function () {
                    clearTimeout(overTimer);
                    console.log('上报失败');
                    if (typeof cb === 'function') {
                        cb({status: 'error'})
                    }
                };


            } else {
                console.log('参数错误');
            }
        };

        return lxUpData;

    })));
