import { Context, FileInfo, ICoreHandler } from './interface';
export declare class CoreComponentHandler implements ICoreHandler {
    sources: FileInfo[];
    verify(ctx: Context): Boolean;
    inject(file: FileInfo): boolean;
    handle(ctx: Context): void;
    load(ctx: Context, files: FileInfo[], globalMode: boolean): void;
}
