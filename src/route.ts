import { RouteRecord } from 'vue-router'
import { Context, FileInfo, ICoreHandler } from './interface'

export interface CoreRouteRecord extends Partial<RouteRecord> {
  dynamic?: boolean
}

export interface CoreRoute {
  name: string
  url: string
  value: Function
  dynamic: boolean
}

const ROUTE_REG = /^routes$/

/**
 * 处理
 */
export class CoreRouteHandler implements ICoreHandler {
  sources: FileInfo[] = []

  verify(ctx: Context): Boolean {
    return !!ctx.router
  }

  inject({ type, ...other }: FileInfo) {
    if (ROUTE_REG.test(type)) {
      this.sources.push({
        type,
        ...other
      })
      return true
    }
  }

  async handle(ctx: Context) {
    for (let i = 0; i < this.sources.length; i++) {
      const source = this.sources[i]
      if (!['jsx', 'tsx', 'vue'].includes(source.fileType)) {
        continue
      }

      const { url, name, module, path } = source
      try {
        const value = source.value
        const route = value[ctx.exportWords.route]
        if (route?.dynamic) continue

        ctx.router.addRoute({
          name,
          path: '/' + [module, path, name].join('/').replace(/\/\//g, '/'),
          ...route,
          component: value.default
        })
      } catch (err) {
        console.error('import route error [', url, ']:\n', err)
        continue
      }
    }
  }
}
