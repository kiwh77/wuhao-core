var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useService } from 'wuhao-network';
var SERVICE_REG = /^services$/;
var CoreServiceHandler = /** @class */ (function () {
    function CoreServiceHandler() {
        this.sources = [];
    }
    CoreServiceHandler.prototype.verify = function (ctx) {
        return true;
    };
    CoreServiceHandler.prototype.inject = function (_a) {
        var type = _a.type, other = __rest(_a, ["type"]);
        if (SERVICE_REG.test(type)) {
            this.sources.push(__assign({ type: type }, other));
            return true;
        }
    };
    CoreServiceHandler.prototype.handle = function (ctx) {
        for (var i = 0; i < this.sources.length; i++) {
            var source = this.sources[i];
            var value = source.value;
            for (var name_1 in value) {
                useService(value[name_1]);
            }
        }
    };
    return CoreServiceHandler;
}());
export { CoreServiceHandler };
//# sourceMappingURL=service.js.map