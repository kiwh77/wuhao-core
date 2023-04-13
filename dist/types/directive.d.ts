import { Context, FileInfo, ICoreHandler } from './interface';
export declare class CoreDirectiveHandler implements ICoreHandler {
    sources: FileInfo[];
    verify(ctx: Context): Boolean;
    inject(file: FileInfo): boolean;
    handle(ctx: Context): void;
}
