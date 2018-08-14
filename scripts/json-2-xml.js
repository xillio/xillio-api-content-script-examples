/**
 * Recursively traverse the json structure and turn it into xml.
 * 
 * @param {string} parent 
 * @param {object} value 
 */
function json2xml(parent, value) {
    if (value !== null) {
        if (Array.isArray(value)) { // Parse array
            return value.map((value) => `<${parent}>${json2xml(parent, value)}</${parent}>`).join('');
        } else if (typeof value === 'object') { // Parse object
            return Object.keys(value).map((key, index) => {
                const tag = createValidTag(key);
                if (Array.isArray(value[key])) {
                    return `${json2xml(tag, value[key])}`;
                }
                return `<${tag}>${json2xml(tag, value[key])}</${tag}>`;
            }).join('');
        } else { // Parse atomic values
            return value;
        }
    } else {
        return '';
    }
}

/**
 * JSON field names are not valid XML element name. This function creates a string into a valid xml element name.
 * @param {string} key 
 */
function createValidTag(key) {
    return key
        .replace(/\s/g, "_") //Replace spaces
        .replace(/[^a-zA-Z0-9_\-]/g, "."); //Replace symbols
}

module.exports = function (input) {
    const content = input.content.toString();
    const json = JSON.parse(input.content);
    return `<?xml version="1.0" ?><json>${json2xml('json', json)}</json>`;
};