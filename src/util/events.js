import EventEmitter from "events";

class MyEmitter {
    constructor() {
        this.instance = null;
        this.myEitter = new EventEmitter();
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new MyEmitter();
        }
        return this.instance = new MyEmitter();
    }

    listen = (key, fn) => {
        this.myEitter.on(key, fn);
    }

    trigger = (key, value) => {
        if (value) {
            this.myEitter.emit(key, value);
        } else {
            this.myEitter.emit(key);
        }
    }

    remove = (key, fn) => {
        this.myEitter.removeListener(key, fn);
    }

    removeAll = () => {
        this.myEitter.removeAllListeners(key, fn);
    }
}

export default MyEmitter.getInstance();