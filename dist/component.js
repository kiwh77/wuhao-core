var CoreComponentHandler = /** @class */ (function () {
    function CoreComponentHandler() {
        this.sources = [];
    }
    CoreComponentHandler.prototype.verify = function (ctx) {
        return !!ctx.app;
    };
    CoreComponentHandler.prototype.inject = function (file) {
        if (file.type === 'components') {
            this.sources.push(file);
            return true;
        }
    };
    CoreComponentHandler.prototype.handle = function (ctx) {
        this.load(ctx, this.sources, false);
    };
    CoreComponentHandler.prototype.load = function (ctx, files, globalMode) {
        files.forEach(function (source) {
            var value = source.value;
            var autoInject = value[ctx.exportWords.autoInject] || globalMode;
            if (autoInject) {
                ctx.app.component(source.name, value.default);
            }
        });
    };
    return CoreComponentHandler;
}());
export { CoreComponentHandler };
//# sourceMappingURL=component.js.map