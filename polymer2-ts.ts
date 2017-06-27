/// <reference path="../reflect-metadata/Reflect.d.ts" />

function observe(targets: string | string[]) {
    return (proto: any, propName: string): any => {
        const targetString = typeof targets === 'string' ? targets : targets.join(',');
        proto._createMethodObserver(`${propName}(${targetString})`, true);
    }
}

function computed<T>(name: string) {
    return (proto: any, propName: string): any => {
        var funcText = proto[propName].toString();
        var start = funcText.indexOf("(");
        var end = funcText.indexOf(")");
        var propertiesList = funcText.substring(start + 1, end);
        var signature = proto[propName].name + "(" + propertiesList + ")";
        console.log(signature);
        proto.constructor.createComputedProperty(name, signature, true);
    }
}

function property<T>(options?: PropertyOptions) {
    return (proto: any, propName: string): any => {
        const notify = (options && options.notify) ? true : false;
        const reflect = (options && options.reflectToAttribute) ? true : false;
        const readOnly = (options && options.readOnly) ? true : false;

        if (!proto.constructor.__polymer_ts_config) {
            proto.constructor.__polymer_ts_config = (proto.constructor.properties || {});
        }

        const type = Reflect.getMetadata("design:type", proto, propName);
        let propConfig: any = {};
        if (type) propConfig.type = true;
        if (notify) propConfig.notify = true;
        if (reflect) propConfig.reflectToAttribute = true;

        proto.constructor.__polymer_ts_config[propName] = propConfig;

        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    }
}

function listen(eventName: string, targetElem?: string) {
    return (proto: any, functionKey: any) => {
        if (proto.ready.name === 'addEventListenersOnReady') {
            proto.ready._listeners.push({ targetElem, functionKey, eventName });
            return;
        }

        const ready = proto.ready;
        proto.ready = function addEventListenersOnReady(...args: any[]) {
            ready.apply(this, args);
            proto.ready._listeners.forEach((v: any) => {
                var node = this.$[v.targetElem] || this;
                node.addEventListener(v.eventName, (e: any) => { this[v.functionKey](e) })
            });
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
};

