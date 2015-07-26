'use strict';

var _ = require('starkjs-underscore');

function flatify(obj, path, sign) {
    var endPath,
        type = _.getType(obj),
        flatObject = {};

    if(arguments.length === 2){
        sign = path;
        path = null;
    }
    sign = sign || '.';
    if (!_.isDefined(path)) {
        path = sign;
    }

    if (type === 'array' || type === 'object') {
        _.keys(obj).forEach(function(key) {
            var value = key + sign,
                newD = flatify(obj[key], path + value, sign);
            _.extend(flatObject, newD);
        });

    } else {
        endPath = path.substr(1, path.length - 2);
        flatObject[endPath] = obj;
    }
    return flatObject;
}

function getPath(sign, start, value, key) {
    var ref = start || {},
        paths;
    var sign = sign || '.';
    paths = key.split(sign).map(function(keypart) {
        var numbericValue = parseInt(keypart, 0);
        if (!isNaN(numbericValue)) {
            keypart = numbericValue;
        }
        return keypart;
    });

    paths.forEach(function(val, index) {
        var nextPath = paths[index + 1],
            isArray = _.isNumber(nextPath);

        if (_.isDefined(nextPath) && !_.isDefined(start[val])) {
            if (isArray) {
                start[val] = [];
            } else {
                start[val] = {};
            }
        }

        if (!_.isDefined(nextPath)) {
            start[val] = value;
        }

        start = start[val];
    });
    return ref;
}

function toObject(flatObject, sign) {
    var result = {};
    _.reduce(flatObject, getPath.bind(null, sign), result);
    return result;
}

module.exports = {
    flatify: flatify,
    toObject: toObject
};
