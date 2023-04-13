import { RouteRecord } from 'vue-router';
import { Context, FileInfo, ICoreHandler } from './interface';
export interface CoreRouteRecord extends Partial<RouteRecord> {
    dynamic?: boolean;
}
export interface CoreRoute {
    name: string;
    url: string;
    value: Function;
    dynamic: boolean;
}
/**
 * 处理
 */
export declare class CoreRouteHandler implements ICoreHandler {
    sources: FileInfo[];
    verify(ctx: Context): Boolean;
    inject({ type, ...other }: FileInfo): boolean;
    handle(ctx: Context): Promise<void>;
}
