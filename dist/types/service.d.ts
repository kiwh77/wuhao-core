import { Context, FileInfo, ICoreHandler } from './interface';
export declare class CoreServiceHandler implements ICoreHandler {
    sources: FileInfo[];
    verify(ctx: Context): Boolean;
    inject({ type, ...other }: FileInfo): boolean;
    handle(ctx: Context): void;
}
