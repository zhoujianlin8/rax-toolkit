/**
 * Created by zhou on 16/12/27.
 */
import ApiMap from './apimap';
<%if(isWeex === false){%>
import Reqwest from 'reqwest';
<%}%>
var tools = {
    /*
     * 调用改核心方法 统一接口处理
     * */
    fetchData: function (param, suc = () => {
    }, err = () => {
    }) {
        if (this.isString(param)) {
            param = {api: param};
        }
        param = this.getParam(param);
        param.success = function (res = {}) {
            //todo
            suc(res)
        };
        param.error = function (error) {
            //todo
            err(res)
        };
        <%if(isWeex === false){%>
        return Reqwest(param);
        <%}else{%>
        //todo Fetch
         return  Fetch(param);
         <%}%>
    }
    ,
    safeExe(fn)
    {
        var newFn;
        var that = this;
        if (this.isDaily() || this.isLocal()) {
            newFn = fn;
        } else {
            newFn = function () {
                try {
                    fn.apply(that, arguments)
                } catch (e) {
                    console.log(e)
                }
            };
        }
        return newFn
    },
    getToken()
    {
        var $token = document.getElementsByName('_tb_token_');
        return $token.length ? $token[0].value : '';
    }
    ,
    isDaily()
    {
        var host = window.location.host;
        return host.indexOf('.daily.') > -1;
    }
    ,
    isLocal()
    {
        var host = window.location.hostname;
        return host === 'localhost' || host === '127.0.0.1'
    }
    ,
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    ,
    getParam: function (param = {}) {
        var defaultConfig = {
            type: 'json',
            method: 'get'
        };
        if (param.api && ApiMap[param.api]) {
            param = this.extend(ApiMap[param.api], param);
        }
        param = this.extend(defaultConfig, param);
        if (!param.url) {
            if (this.isLocal() && location.port !== '6001') {
                //使用本地代理
                if (location.href.indexOf('proxyurl') > -1) {
                    param.url = '/data/' + type + '.json?proxyUrl=http://place.daily.taobao.net' + param.api;
                } else {
                    param.url = '/data/' + type + '.json';
                }
            } else {
                if (!/^(http:\/\/|\/\/)/i.test(param.api)) {
                    param.url = location.protocol + '//' + location.host + param.api
                } else {
                    param.url = param.api;
                }
            }
        }

        if (param.addToken !== false) {
            param.url.indexOf('?') === -1 ? param.url += '?' : param.url += '&';
            param.url += '_tb_token_=' + this.getToken();
        }
        if (param.addCharset !== false) {
            param.url.indexOf('?') === -1 ? param.url += '?' : param.url += '&';
            param.url += '_input_charset=utf-8';
        }
        return param;
    }
    ,
    getUrl: function (api) {
        return this.getParam({api: api}).url
    }
    ,
    isArray: function (object) {
        return object instanceof Array
    }
    ,
    isWindow: function (obj) {
        return obj != null && obj == obj.window
    }
    ,
    isDocument: function (obj) {
        return obj != null && obj.nodeType == obj.DOCUMENT_NODE
    }
    ,
    isObject: function (obj) {
        return this._type(obj) == "object"
    }
    ,
    isFunction: function (fn) {
        return this._type(fn) == "function"
    }
    ,
    isPlainObject: function (obj) {
        return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }
    ,
    _type: function (obj) {
        var class2type = {};
        var toString = class2type.toString;
        return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
    }
    ,
    isString: function (str) {
        return typeof str === 'string'
    }
    ,
    extend: function (target, source) {
        target = target || {};
        source = source || {};
        for (var key in source) {
            target[key] = source[key]
        }
        return target;

    }
    ,
    namespace: function (name) {
        return function (v) {
            return name + '-' + v;
        }
    }
};
export const NameSpace = tools.namespace.bind(tools);
export const Ajax = tools.fetchData.bind(tools);
export default tools;
