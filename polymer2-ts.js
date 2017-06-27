/// <reference path="../reflect-metadata/Reflect.d.ts" />
function observe(targets) {
    return (proto, propName) => {
        const targetString = typeof targets === 'string' ? targets : targets.join(',');
        proto._createMethodObserver(`${propName}(${targetString})`, true);
    };
}
function computed(name) {
    return (proto, propName) => {
        var funcText = proto[propName].toString();
        var start = funcText.indexOf("(");
        var end = funcText.indexOf(")");
        var propertiesList = funcText.substring(start + 1, end);
        var signature = proto[propName].name + "(" + propertiesList + ")";
        console.log(signature);
        proto.constructor.createComputedProperty(name, signature, true);
    };
}
function property(options) {
    return (proto, propName) => {
        const notify = (options && options.notify) ? true : false;
        const reflect = (options && options.reflectToAttribute) ? true : false;
        const readOnly = (options && options.readOnly) ? true : false;
        if (!proto.constructor.__polymer_ts_config) {
            proto.constructor.__polymer_ts_config = (proto.constructor.properties || {});
        }
        const type = Reflect.getMetadata("design:type", proto, propName);
        let propConfig = {};
        if (type)
            propConfig.type = true;
        if (notify)
            propConfig.notify = true;
        if (reflect)
            propConfig.reflectToAttribute = true;
        proto.constructor.__polymer_ts_config[propName] = propConfig;
        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
        else {
            proto.constructor.properties = {
                get() { return proto.constructor.__polymer_ts_config; }
            };
        }
    };
}
function listen(eventName, targetElem) {
    return (proto, functionKey) => {
        if (proto.ready.name === 'addEventListenersOnReady') {
            proto.ready._listeners.push({ targetElem, functionKey, eventName });
            return;
        }
        const ready = proto.ready;
        proto.ready = function addEventListenersOnReady(...args) {
            ready.apply(this, args);
            proto.ready._listeners.forEach((v) => {
                var node = this.$[v.targetElem] || this;
                node.addEventListener(v.eventName, (e) => { this[v.functionKey](e); });
            });
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
