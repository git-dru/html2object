function tokenize(html) {
    const tokens = [];
    let pos = 0;

    while (pos < html.length) {
        // Opening tag
        if (html[pos] === '<' && html[pos + 1] !== '/') {
            const endOfTag = html.indexOf('>', pos);
            tokens.push(html.substring(pos, endOfTag + 1));
            pos = endOfTag + 1;
        }
        // Closing tag
        else if (html[pos] === '<' && html[pos + 1] === '/') {
            const endOfTag = html.indexOf('>', pos);
            tokens.push(html.substring(pos, endOfTag + 1));
            pos = endOfTag + 1;
        }
        // Text
        else {
            const nextOpeningTag = html.indexOf('<', pos);
            const text = html.substring(pos, nextOpeningTag).trim();
            if (text) tokens.push(text);
            pos = nextOpeningTag;
        }
    }

    return tokens;
}

function parse(tokens) {
    const rootNode = { children: [] };  // Dummy node
    const nodeStack = [rootNode];
    let currentNode = rootNode;

    while (tokens.length > 0) {
        const token = tokens.shift();
        if (/<[^/].*>/.test(token)) {  // Opening tag
            const tagMatch = token.match(/^<([a-z\-]+)([^>]*)>/);
            const tagName = tagMatch[1];
            const attributes = extractAttributes(tagMatch[2]);
            const nextToken = tokens[0];
            
            // If next token is not an opening or closing tag, it's a text
            let text = (nextToken && !/^<.*>/.test(nextToken)) ? tokens.shift().trim() : undefined;
            
            const newNode = { 
                tag: tagName,
                ...(text && { text: text }),
                ...(attributes.style && { style: attributes.style }),
                ...(attributes.id && { id: attributes.id }),
                ...(attributes.class && { class: attributes.class }),
                children: []
            };
            
            // Attach the new node as a child to the current node
            currentNode.children.push(newNode);
            // Update the current node and push to the stack
            currentNode = newNode;
            nodeStack.push(newNode);
        } 
        else if (/<\/.*>/.test(token)) {  // Closing tag
            if (currentNode.children.length === 0) {
                delete currentNode.children;  // Remove children attribute if it's empty
            }
            nodeStack.pop();  // Pop the current node
            currentNode = nodeStack[nodeStack.length - 1];  // Update the current node
        }
    }

    if (rootNode.children[0].children.length === 0) {
        delete rootNode.children[0].children;  // Remove children attribute if it's empty for root
    }

    return rootNode.children[0];  // Return the actual root (the first child of our dummy node)
}



function extractAttributes(attributeString) {
    const attributes = {};
    (attributeString.match(/([a-z\-]+)\s*=\s*"([^"]+)"/gi) || []).forEach(attr => {
        const [_, key, value] = attr.match(/([a-z\-]+)\s*=\s*"([^"]+)"/i);
        const cleanedKey = key.toLowerCase();

        if (cleanedKey === 'style') {
            const styleObject = {};
            value.split(';').forEach(style => {
                const [styleKey, styleValue] = style.split(':').map(s => s.trim());
                if (styleKey && styleValue) {
                    styleObject[styleKey.replace(/-([a-z])/g, g => g[1].toUpperCase())] = styleValue;
                }
            });
            attributes.style = styleObject;
        } else {
            attributes[cleanedKey] = value;
        }
    });

    return attributes;
}

module.exports = {tokenize, parse}
