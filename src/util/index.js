export const hasOwnProperty = (obj, key) => {
    const hasOwn = {}.hasOwnProperty;
    return hasOwn.call(obj, key);
};

export const totype = value => {
    const toString = {}.toString;
    const class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error Symbol'
        .split(' ')
        .forEach(item => {
            class2type[`[object ${item}]`] = item.toLowerCase();
        });
    return class2type[toString.call(value)];
};
