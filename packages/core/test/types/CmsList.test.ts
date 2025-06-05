import { describe, expect, it } from 'vitest';
import { CmsList, CmsListMetadata } from '../../src/types/CmsList';

describe('CmsList', () => {
    it('should default metadata name to class name (TestList)', () => {
        @CmsListMetadata({})
        class TestList extends CmsList {
            defineModel() {
                return [];
            }
        }

        const tl = new TestList();
        const md = tl.getMetadata();
        expect(md.name).toBe('TestList');
    });

    it.each(['TestList', 'ListOfTest', 'ItemA', 'ItemB'])(
        'should set metadata name to (%s)',
        (name) => {
            @CmsListMetadata({ name: name })
            class TestList extends CmsList {
                defineModel() {
                    return [];
                }
            }
            const tl = new TestList();
            const md = tl.getMetadata();
            expect(md.name).toBe(name);
        },
    );
});
