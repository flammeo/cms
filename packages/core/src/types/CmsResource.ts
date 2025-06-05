export abstract class CmsResource {
    abstract defineModel(): unknown[] | Promise<unknown[]>;
}
