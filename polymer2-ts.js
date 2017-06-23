/// <reference path="../reflect-metadata/Reflect.d.ts" />
function observe(targets) {
    return (proto, propName) => {
        const targetString = typeof targets === 'string' ? targets : targets.join(',');
        proto._createMethodObserver(`${propName}(${targetString})`, true);
    };
}
function property(options) {
    return (proto, propName) => {
        const notify = (options && options.notify);
        const reflect = (options && options.reflectToAttribute);
        const readOnly = (options && options.readOnly);
        const computed = (options && options.computed);
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
                };
        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    };
}
function listen(targetElem, eventName) {
    return (proto, functionKey) => {
        if (proto.ready.name === 'addEventListenersOnReady') {
            proto.ready._listeners.push({ targetElem, functionKey, eventName });
            return;
        }
        const ready = proto.ready;
        proto.ready = function addEventListenersOnReady(...args) {
            ready.apply(this, args);
            proto.ready._listeners.forEach((v) => this.$[targetElem].addEventListener(eventName, (e) => { this[functionKey](e); }));
        };
        proto.ready._listeners = [{ targetElem, functionKey, eventName }];
    };
}
function customElement(tagname) {
    return (klass) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    };
}
;
