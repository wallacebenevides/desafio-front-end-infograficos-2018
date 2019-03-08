import { environment } from "../app-config";
const isDebugMode = environment.isDev;

const noop = () => undefined;

const timestamp = () => {
    return new Date().toISOString();
};

export class Logger {
    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static get log() {
        if (isDebugMode) {
            return console.log.bind(console, `${timestamp()} [LOG] `);
        } else {
            return noop;
        }
    }

    static get info() {
        if (isDebugMode) {
            return console.info.bind(console, `${timestamp()} [INFO] `);
        } else {
            return noop;
        }
    }

    static get warn() {
        if (isDebugMode) {
            return console.warn.bind(console, `${timestamp()} [WARN] `);
        } else {
            return noop;
        }
    }

    static get error() {
        if (isDebugMode) {
            return console.error.bind(console, `${timestamp()} [ERROR] `);
        } else {
            return noop;
        }
    }

    static get trace() {
        if (isDebugMode) {
            return console.trace.bind(console, `${timestamp()} [TRACE] `);
        } else {
            return noop;
        }
    }
}
