import { App } from 'vue'
import { Router } from 'vue-router'

export interface FileInfo {
  /** 路径 */
  url: string
  /** 支持的资源类型 */
  type: 'routes' | 'services' | 'directives' | 'components' | string
  /** 模块名 */
  module: string
  /** 模块下业务路径 */
  path: Array<string>
  /** 文件类型 */
  fileType?: string | 'vue' | 'ts' | 'js' | 'tsx' | 'jsx'
  /** 文件名 */
  name?: string
  /** 文件数据 */
  value?: any
}

export interface Context {
  app?: App
  router?: Router
  exportWords?: {
    autoInject: 'autoInject' | string
    route: 'route' | string
  }
}

export interface ICoreHandler {
  sources: Array<FileInfo>

  verify(ctx: Context): Boolean

  inject(file: FileInfo): Boolean
  handle(ctx: Context): void
}
