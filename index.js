var _ = require('lodash');
var flatify = require('./lib/flatten');
var myGlobal = {};

/**
 *
 * Useful for longer api chains where you have to test each object in
 * the chain, or when you have an object reference in string format.
 * Objects are created as needed along `path`. Returns the passed
 * value if setting is successful or `undefined` if not.
 *
 *  @param name
 *  @param value
 *  @param context
 *  @returns {*}
 */
function set(name, value, context) {
    context = context || myGlobal;

    var parts = name.split('.');
    var p = parts.pop();
    var obj = internalGet(parts, true, null, context);
    return obj && p ? (obj[p] = value) : undefined; // Object
}

/**
 *
 * @param parts
 * @param create
 * @param defaultValue
 * @param context
 * @returns {*|_get}
 * @private
 */
function internalGet(parts, create, defaultValue, context) {
    context = context || myGlobal;
    create = create || false;
    defaultValue = defaultValue || null;

    try {
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            if (!(p in context)) {
                if (create) {
                    context[p] = {};
                } else {
                    return defaultValue;
                }
            }
            context = context[p];
        }
        return context; // mixed
    } catch (e) {
        return defaultValue;
    }
}

/**
 * get object by path
 *
 * @param context
 * @param path
 * @param defaultValue
 * @returns {*|_get}
 */
function get(path, defaultValue, context) {
    var parts = path.split('.');

    return internalGet(parts, false, defaultValue, context);
}


var camelCaseToObject = function(autobot) {
    return _.transform(autobot, function(item, value, key) {
        var parts = _.words(key, /([a-zA-Z]{1}[a-z]{1,})/g).map(function(keyPart) {
            return keyPart.toLowerCase();
        });

        var p = parts.pop();
        var obj = internalGet(parts, true, null, item);
        return obj && p ? (obj[p] = value) : undefined; // Object
    });
}
var objectToCamelCase = function(autobot) {
    var flat = flatify.flatify(autobot);
    return _.transform(flat, function(item, value, key) {
        var newKey = '';
        key.split('.').map(function(keyPart, index, keys) {
            if (index === 0) {
                newKey += keyPart;
            } else {
                newKey += keyPart.charAt(0).toUpperCase();
                newKey += keyPart.substr(1);
            }
            if (index === keys.length - 1) {
                item[newKey] = value;
            }

            return item;
        });
    });
}
exports.deep = camelCaseToObject;
exports.flat = objectToCamelCase;

