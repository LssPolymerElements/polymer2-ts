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
function computed(name) {
    return (proto, propName) => {
        let funcText = proto[propName].toString();
        let start = funcText.indexOf('(');
        let end = funcText.indexOf(')');
        let propertiesList = funcText.substring(start + 1, end);
        let signature = getName(proto[propName]) + '(' + propertiesList + ')';
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
        if (!proto._addEventListenerToNode || proto._addEventListenerToNode.toString().indexOf('gesture') === -1) {
            throw new Error('Polymer.Gestures not detected.  You must extend Polymer.GestureEventListeners(Polymer.Element) when using the gestureListen() decorator');
        }
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
    if (getName(proto.ready) === 'registerOnReady')
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
}
function customElement(tagname) {
    return (klass) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    };
}
