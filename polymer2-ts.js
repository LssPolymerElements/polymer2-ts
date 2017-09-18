function observe(targets) {
    return (proto, propName) => {
        const targetString = typeof targets === 'string' ? targets : targets.join(',');
        if (!proto.constructor.__polymer_observer_config) {
            proto.constructor.__polymer_observer_config = (proto.constructor.observers || []);
        }
        proto.constructor.__polymer_observer_config.push(`${propName}(${targetString})`);
        if (!proto.constructor.hasOwnProperty('observers')) {
            Object.defineProperty(proto.constructor, 'observers', {
                get() { return proto.constructor.__polymer_observer_config; }
            });
        }
    };
}
function computed(name, properties = []) {
    return (proto, propName) => {
        let signature = getName(proto[propName]) + '(' + properties + ')';
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
        const type = Reflect.getMetadata('design:type', proto, propName);
        let propConfig = {};
        propConfig.type = type;
        if (notify)
            propConfig.notify = true;
        if (reflect)
            propConfig.reflectToAttribute = true;
        if (readOnly)
            propConfig.readOnly = true;
        proto.constructor.__polymer_ts_config[propName] = propConfig;
        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    };
}
function listen(eventName, targetElem) {
    return (proto, functionKey) => {
        addReadyHandler(proto);
        if (proto.__listeners) {
            proto.__listeners.push({ targetElem, functionKey, eventName });
            return;
        }
        proto.__listeners = [{ targetElem, functionKey, eventName }];
    };
}
function gestureListen(eventName, targetElem) {
    return (proto, functionKey) => {
        addReadyHandler(proto);
        if (proto.__gestureListeners) {
            proto.__gestureListeners.push({ targetElem, functionKey, eventName });
            return;
        }
        proto.__gestureListeners = [{ targetElem, functionKey, eventName }];
    };
}
//IE 11 Support
function getName(func) {
    return func.name ? func.name : func.toString().match(/^function\s*([^\s(]+)/)[1];
}
function addReadyHandler(proto) {
    if (proto.__readyHandlerAdded)
        return;
    const ready = proto.ready;
    proto.ready = function registerOnReady(...args) {
        ready.apply(this, args);
        // console.log("registering " + proto.__gestureListeners.length + " gestures.")
        // console.log("registering " + proto.__listeners.length + " listeners.")
        //Add Polymer Gesture Listeners
        if (proto.__gestureListeners) {
            proto.__gestureListeners.forEach((v) => {
                let node = this.$[v.targetElem] || this;
                Polymer.Gestures.addListener(node, v.eventName, (e) => { this[v.functionKey](e); });
                // console.log(node, this[v.functionKey].toString(), v.eventName);
            });
        }
        //Add Event Listeners
        if (proto.__listeners) {
            proto.__listeners.forEach((v) => {
                let node = this.$[v.targetElem] || this;
                node.addEventListener(v.eventName, (e) => { this[v.functionKey](e); });
                // console.log(node, this[v.functionKey].toString(), v.eventName);
            });
        }
    };
    proto.__readyHandlerAdded = true;
}
function customElement(tagname) {
    return (klass) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    };
}
