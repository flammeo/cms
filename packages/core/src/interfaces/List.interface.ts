import { CmsListModel } from './ListModel.interface.js';

export interface CmsList {
    registerModel(): Promise<CmsListModel> | CmsListModel;
}
