import { Context, FileInfo, ICoreHandler } from './interface'

export class CoreComponentHandler implements ICoreHandler {
  sources: FileInfo[] = []

  verify(ctx: Context): Boolean {
    return !!ctx.app
  }

  inject(file: FileInfo) {
    if (file.type === 'components') {
      this.sources.push(file)
      return true
    }
  }

  handle(ctx: Context) {
    this.load(ctx, this.sources, false)
  }

  load(ctx: Context, files: FileInfo[], globalMode: boolean) {
    files.forEach(source => {
      const value = source.value

      const autoInject = value[ctx.exportWords.autoInject] || globalMode

      if (autoInject) {
        ctx.app.component(source.name, value.default)
      }
    })
  }
}
