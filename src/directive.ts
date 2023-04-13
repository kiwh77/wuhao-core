import { Context, FileInfo, ICoreHandler } from './interface'

export class CoreDirectiveHandler implements ICoreHandler {
  sources: FileInfo[] = []

  verify(ctx: Context): Boolean {
    return !!ctx.app
  }

  inject(file: FileInfo) {
    if (file.type === 'directives') {
      this.sources.push(file)
      return true
    }
  }

  handle(ctx: Context) {
    this.sources.forEach(source => {
      const value = source.value
      Object.keys(value).forEach(name => {
        if (name === 'default') {
          const defaultDirective = value[name]
          ctx.app.directive(source.name, defaultDirective)
        } else {
          ctx.app.directive(name, value[name])
        }
      })
    })
  }
}
