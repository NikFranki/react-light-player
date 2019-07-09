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

const formatTime = time => {
    let timeStr = '00';
    if (time > 0 && time < 10) {
        timeStr = '0' + time;
    } else if (time >= 10) {
        timeStr = time;
    }
    return timeStr;
};

export const getTime = (second) => {
    second = Math.floor(second);
    let minute = Math.floor(second / 60);
    second = second - minute * 60;
    return parseInt(formatTime(minute)) + ':' + formatTime(second);
};

export const debounce = (func, delay) => {
    let timeout = null;
    return function() {
        clearTimeout(timeout);
        const args = arguments;
        timeout = setTimeout(() => {
            return func.apply(this, args);
        }, delay);
    };
};