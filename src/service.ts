import { Context, FileInfo, ICoreHandler } from './interface'
import { useService } from 'wuhao-network'

const SERVICE_REG = /^services$/

export class CoreServiceHandler implements ICoreHandler {
  sources: FileInfo[] = []

  verify(ctx: Context): Boolean {
    return true
  }

  inject({ type, ...other }: FileInfo) {
    if (SERVICE_REG.test(type)) {
      this.sources.push({
        type,
        ...other
      })
      return true
    }
  }

  handle(ctx: Context) {
    for (let i = 0; i < this.sources.length; i++) {
      const source = this.sources[i]
      const value = source.value
      for (const name in value) {
        useService(value[name])
      }
    }
  }
}
