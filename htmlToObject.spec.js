const { tokenize, parse } = require('./htmlToObject.js');

describe('HTML Parser', () => {
    describe('tokenize', () => {
        it('should tokenize an HTML string', () => {
            const html = '<div id="main" style="color: red;"><p>Hello, world!</p></div>';
            const tokens = tokenize(html);
            expect(tokens).toEqual([
                '<div id="main" style="color: red;">',
                '<p>',
                'Hello, world!',
                '</p>',
                '</div>'
            ]);
        });
    });

    describe('parse', () => {
        it('should parse tokens into a tree', () => {
            const tokens = [
                '<div id="main" style="color: red;">',
                '<p>',
                'Hello, world!',
                '</p>',
                '</div>'
            ];
            const tree = parse(tokens);
            expect(tree).toEqual({
                tag: 'div',
                id: 'main',
                style: { color: 'red' },
                children: [
                    {
                        tag: 'p',
                        text: 'Hello, world!'
                    }
                ]
            });
        });
    });
});