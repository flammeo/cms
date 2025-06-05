import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
    (name) => `https://docs.flammeo.com/eslint/rules/${name}`,
);

export const REQUIRE_CMS_LIST_METADATA = 'require-cmslist-metadata';
export type MessageIds = 'missingDecorator';
export type Options = [];

export const requireCmsListMetadata = createRule<Options, MessageIds>({
    name: REQUIRE_CMS_LIST_METADATA,
    meta: {
        type: 'problem',
        fixable: 'code',
        docs: {
            description:
                'Ensure classes extending CmsList have @CmsListMetadata',
            //@ts-expect-error test
            recommended: 'error',
        },
        schema: [],
        messages: {
            missingDecorator:
                'Classes extending CmsList must use @CmsListMetadata.',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            ClassDeclaration(node: TSESTree.ClassDeclaration) {
                if (
                    node.superClass?.type !== 'Identifier' ||
                    node.superClass.name !== 'CmsList'
                ) {
                    return;
                }

                const hasDecorator = (node.decorators || []).some(
                    (decorator) => {
                        return (
                            decorator.expression.type === 'CallExpression' &&
                            decorator.expression.callee.type === 'Identifier' &&
                            decorator.expression.callee.name ===
                                'CmsListMetadata'
                        );
                    },
                );

                if (!hasDecorator) {
                    context.report({
                        node: node.id || node,
                        messageId: 'missingDecorator',
                        fix(fixer) {
                            const sourceCode = context.sourceCode;
                            const firstToken = sourceCode.getFirstToken(node);

                            if (!firstToken) return null;
                            const prevToken =
                                sourceCode.getTokenBefore(firstToken) ||
                                firstToken;
                            let insertToken = firstToken;
                            if (
                                prevToken.type === 'Keyword' &&
                                prevToken.value === 'export'
                            ) {
                                insertToken = prevToken;
                            }

                            const decoratorText = `@CmsListMetadata({ name: '${node.id?.name}' })\n`;

                            return fixer.insertTextBefore(
                                insertToken,
                                decoratorText,
                            );
                        },
                    });
                }
            },
        };
    },
});
