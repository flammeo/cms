import { CmsResource } from './CmsResource';

export interface ICmsListMetadata {
    name?: string;
}

const METADATA_KEY = 'CmsList__metadata';

export const GetCmsListMetadata = (
    target: (typeof CmsList)['constructor'],
): ICmsListMetadata | null => {
    const d = Reflect.getMetadata(METADATA_KEY, target);
    return d as ICmsListMetadata;
};

export function CmsListMetadata(options: ICmsListMetadata) {
    return function (target: typeof CmsList) {
        const opts = Object.assign(
            {
                name: target.name,
            } as Partial<ICmsListMetadata>,
            options,
        ) as ICmsListMetadata;
        Reflect.defineMetadata(METADATA_KEY, opts, target);
    };
}

export abstract class CmsList extends CmsResource {
    protected metadata: ICmsListMetadata;

    constructor() {
        super();
        const md = GetCmsListMetadata(this.constructor);
        if (!md) {
            throw new Error(
                'CmsList requires @CmsListMetadata decorator the List (' +
                    this.constructor.name +
                    ') please fix this',
            );
        }
        this.metadata = md;
    }

    getMetadata(): ICmsListMetadata {
        return this.metadata;
    }
}
