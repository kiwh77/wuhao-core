import { Router } from 'vue-router';
import { CoreRouteHandler } from './route';
import { CoreServiceHandler } from './service';
import { App } from 'vue';
import { CoreDirectiveHandler } from './directive';
import { CoreComponentHandler } from './component';
export interface CoreInit {
    /** 资源信息 */
    modules: Function;
    /** 全局组件 */
    components: Function;
    /** vue实例 */
    app: App;
    /** router 实例 */
    router?: Router;
    /** 工程所使用构建框架 */
    mode: 'vite' | 'webpack';
}
/**
 * 路由处理器，加载的路由资源存储在此中
 */
export declare const routeHandler: CoreRouteHandler;
/**
 * 服务处理器，加载的请求存储在此中
 */
export declare const serviceHandler: CoreServiceHandler;
/**
 * 指令处理器，加载的指令存储在此中
 */
export declare const directiveHandler: CoreDirectiveHandler;
/**
 * 组件处理器
 */
export declare const componentHandler: CoreComponentHandler;
/**
 * 网络请求库
 */
export declare const network: import("wuhao-network").WuhaoNetwork;
/**
 * 核心支持库
 * @example
 * createCore({
 *  module: import.meta.globEager('./modules/**\/*.(vue|tsx|jsx)')
 * })
 */
export declare function createCore(props: CoreInit, callback?: Function): Promise<{
    app: App<any>;
    router: Router;
    exportWords: {
        autoInject: string;
        route: string;
    };
}>;
