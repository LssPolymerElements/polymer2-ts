/// <reference path="./bower_components/reflect-metadata/Reflect.d.ts" />
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
        if (!proto.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    };
}
function customElement(tagname) {
    return (klass) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    };
}
;
