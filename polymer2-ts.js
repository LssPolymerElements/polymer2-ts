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
    };
}
function listen(eventName, targetElem) {
    return (proto, functionKey) => {
        addReadyHandler(proto);
        proto.__listeners ? proto.__listeners.push({ targetElem, functionKey, eventName }) : [{ targetElem, functionKey, eventName }];
    };
}
function gestureListen(eventName, targetElem) {
    return (proto, functionKey) => {
        if (proto._addEventListenerToNode || proto._addEventListenerToNode.toString().indexOf("gesture") === -1) {
            throw new Error("Polymer.Gestures not detected.  You must extend Polymer.GestureEventListeners(Polymer.Element) when using the gestureListen() decorator");
        }
        addReadyHandler(proto);
        proto.__gestureListeners ? proto.__gestureListeners.push({ targetElem, functionKey, eventName }) : [{ targetElem, functionKey, eventName }];
    };
}
function addReadyHandler(proto) {
    if (proto.ready.name === 'registerOnReady')
        return;
    const ready = proto.ready;
    proto.ready = function registerOnReady(...args) {
        ready.apply(this, args);
        //Add Polymer Gesture Listeners
        if (proto.__gestureListeners) {
            proto.__gestureListeners.forEach((v) => {
                var node = this.$[v.targetElem] || this;
                Polymer.Gestures.addListener(node, v.eventName, (e) => { this[v.functionKey](e); });
            });
        }
        //Add Event Listeners
        if (proto.__listeners) {
            proto.__listeners.forEach((v) => {
                var node = this.$[v.targetElem] || this;
                node.addEventListener(v.eventName, (e) => { this[v.functionKey](e); });
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
