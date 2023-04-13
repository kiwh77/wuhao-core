import { Router } from 'vue-router'
import { createNetwork } from 'wuhao-network'
import { CoreRouteHandler } from './route'
import { CoreServiceHandler } from './service'
import { App } from 'vue'
import { FileInfo, ICoreHandler } from './interface'
import { CoreDirectiveHandler } from './directive'
import { CoreComponentHandler } from './component'

export interface CoreInit {
  /** 资源信息 */
  modules: Function
  /** 全局组件 */
  components: Function
  /** vue实例 */
  app: App
  /** router 实例 */
  router?: Router
  /** 工程所使用构建框架 */
  mode: 'vite' | 'webpack'
}

function moduleParse(key: string, value: any) {
  const [, , module, type, ...path] = key.split('/')
  const fileName = path.pop()

  const result: FileInfo = {
    url: key,
    module,
    type,
    path,
    value
  }
  if (fileName) {
    const [fileType, name] = fileName.split('.').reverse()
    result.fileType = fileType
    result.name = name
  }

  return result
}

function componentParse(key: string, value: any) {
  const [, ...path] = key.split('/')
  const fileName = path.pop()

  const result: FileInfo = {
    url: key,
    module: 'global',
    type: 'components',
    path,
    value
  }
  if (fileName) {
    const [fileType, name] = fileName.split('.').reverse()
    result.fileType = fileType
    result.name = name
  }

  return result
}

/**
 * 路由处理器，加载的路由资源存储在此中
 */
export const routeHandler = new CoreRouteHandler()
/**
 * 服务处理器，加载的请求存储在此中
 */
export const serviceHandler = new CoreServiceHandler()
/**
 * 指令处理器，加载的指令存储在此中
 */
export const directiveHandler = new CoreDirectiveHandler()
/**
 * 组件处理器
 */
export const componentHandler = new CoreComponentHandler()
/**
 * 网络请求库
 */
export const network = createNetwork()

/**
 * 核心支持库
 * @example
 * createCore({
 *  module: import.meta.globEager('./modules/**\/*.(vue|tsx|jsx)')
 * })
 */
export async function createCore(props: CoreInit, callback?: Function) {
  const ctx = {
    app: props.app,
    router: props.router,
    exportWords: {
      autoInject: 'autoInject',
      route: 'route'
    }
  }

  const plugins: ICoreHandler[] = [
    serviceHandler,
    routeHandler,
    directiveHandler,
    componentHandler
  ].filter(handler => handler.verify(ctx))

  const components =
    typeof props.components === 'function'
      ? props.components()
      : props.components
  if (componentHandler.verify(ctx)) {
    componentHandler.load(
      ctx,
      Object.keys(components).map(key => componentParse(key, components[key])),
      true
    )
  }

  const modules =
    typeof props.modules === 'function' ? props.modules() : props.modules
  Object.keys(modules).forEach(key => {
    const value = modules[key]
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i]
      if (plugin.inject(moduleParse(key, value))) break
    }
  })

  plugins.forEach(async plugin => plugin.handle && (await plugin.handle(ctx)))

  callback && callback(ctx)
  return ctx
}
