import { RuleTester } from '@typescript-eslint/rule-tester';
import { requireCmsListMetadata } from '../../src/rules/require-cmslist-metadata';
import dedent from 'dedent';

const ruleTester = new RuleTester();

ruleTester.run('require-cmslist-metadata', requireCmsListMetadata, {
    valid: [
        {
            name: 'Extends CMS List and contains Decorator',
            code: `
                @CmsListMetadata({ name: 'TestList' })
                export class TestList extends CmsList {}
            `,
        },
        {
            name: "Class doesn't extend CmsList",
            code: `
                class NotCmsList {}
             `,
        },
    ],
    invalid: [
        {
            name: 'it should place CmsListMetadata before export on --fix',
            code: `export class TestList extends CmsList {}`,
            errors: [{ messageId: 'missingDecorator' }],
            output: dedent`
                @CmsListMetadata({ name: 'TestList' })
                export class TestList extends CmsList {}
            `,
        },
        {
            name: 'it should place CmsListMetadata before class on --fix',
            code: `class TestList extends CmsList {}`,
            errors: [{ messageId: 'missingDecorator' }],
            output: dedent`
                @CmsListMetadata({ name: 'TestList' })
                class TestList extends CmsList {}
            `,
        },
    ],
});
