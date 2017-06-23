/// <reference path="../reflect-metadata/Reflect.d.ts" />

function observe(targets: string | string[]) {
    return (proto: any, propName: string): any => {
        const targetString = typeof targets === 'string' ? targets : targets.join(',');
        proto._createMethodObserver(`${propName}(${targetString})`, true);
    }
}

function property<T>(options?: PropertyOptions) {
    return (proto: any, propName: string): any => {
        const notify = (options && options.notify) as boolean;
        const reflect = (options && options.reflectToAttribute) as boolean;
        const readOnly = (options && options.readOnly) as boolean;
        const computed = (options && options.computed) as string;

        if (!proto.constructor.__polymer_ts_config) {
            proto.constructor.__polymer_ts_config = (proto.constructor.properties || {});
        }

        const type = Reflect.getMetadata("design:type", proto, propName);

        proto.constructor.__polymer_ts_config[propName] =
            (!notify && !reflect && !readOnly && !computed) ? type :
                {
                    type: type,
                    notify: notify,
                    reflectToAttribute: reflect
                }

        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    }
}

function listen(targetElem: string, eventName: string) {
    return (proto: any, functionKey: any) => {

        if (proto.ready.name === 'addEventListenersOnReady') {
            proto.ready._listeners.push({ targetElem, functionKey, eventName });
            return;
        }

        const ready = proto.ready;
        proto.ready = function addEventListenersOnReady(...args: any[]) {
            ready.apply(this, args);
            proto.ready._listeners.forEach((v: any) =>
                this.$[targetElem].addEventListener(eventName, (e: any) => { this[functionKey](e) }));
        };
        proto.ready._listeners = [{ targetElem, functionKey, eventName }];
    }
}

function customElement(tagname: string) {
    return (klass: any) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    }
}

interface PropertyOptions {
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
    computed?: string;
};

