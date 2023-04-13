var CoreDirectiveHandler = /** @class */ (function () {
    function CoreDirectiveHandler() {
        this.sources = [];
    }
    CoreDirectiveHandler.prototype.verify = function (ctx) {
        return !!ctx.app;
    };
    CoreDirectiveHandler.prototype.inject = function (file) {
        if (file.type === 'directives') {
            this.sources.push(file);
            return true;
        }
    };
    CoreDirectiveHandler.prototype.handle = function (ctx) {
        this.sources.forEach(function (source) {
            var value = source.value;
            Object.keys(value).forEach(function (name) {
                if (name === 'default') {
                    var defaultDirective = value[name];
                    ctx.app.directive(source.name, defaultDirective);
                }
                else {
                    ctx.app.directive(name, value[name]);
                }
            });
        });
    };
    return CoreDirectiveHandler;
}());
export { CoreDirectiveHandler };
//# sourceMappingURL=directive.js.map