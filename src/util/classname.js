// css 类名处理
import { hasOwnProperty, totype } from './index';
const _classname_ = (function() {
    function classname() {
        let i = 0,
            len = arguments.length,
            classes = [];
        for (; i < len; i++) {
            var arg = arguments[i];
            if (!arg) continue;

            var argType = totype(arg);
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            } else if (argType === 'array' && arg.length) {
                var inner = classname.apply(this, arg);
                if (inner) {
                    classes.push(inner);
                }
            } else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwnProperty(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(' ');
    }
    return classname;
})();

export default _classname_;
