function observe(targets: string | string[]) {
    return (proto: any, propName: string): any => {
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

function computed<T>(name: string, properties: Array<string> = []) {
    return (proto: any, propName: string): any => {
        let signature = getName(proto[propName]) + '(' + properties + ')';
        proto.constructor.createComputedProperty(name, signature, true);
    };
}

function property<T>(options?: PropertyOptions) {
    return (proto: any, propName: string): any => {
        const notify = (options && options.notify) ? true : false;
        const reflect = (options && options.reflectToAttribute) ? true : false;
        const readOnly = (options && options.readOnly) ? true : false;

        if (!proto.constructor.__polymer_ts_config) {
            proto.constructor.__polymer_ts_config = (proto.constructor.properties || {});
        }

        const type = (<any>Reflect).getMetadata('design:type', proto, propName);
        let propConfig: any = {};
        propConfig.type = type;
        if (notify) propConfig.notify = true;
        if (reflect) propConfig.reflectToAttribute = true;
        if (readOnly) propConfig.readOnly = true;

        proto.constructor.__polymer_ts_config[propName] = propConfig;

        if (!proto.constructor.hasOwnProperty('properties')) {
            Object.defineProperty(proto.constructor, 'properties', {
                get() { return proto.constructor.__polymer_ts_config; }
            });
        }
    };
}

function listen(eventName: string, targetElem?: string) {
    return (proto: any, functionKey: any) => {
        addReadyHandler(proto);
        if (proto.__listeners) {
            proto.__listeners.push({ targetElem, functionKey, eventName });
            return;
        }

        proto.__listeners = [{ targetElem, functionKey, eventName }];
    };
}

function gestureListen(eventName: string, targetElem?: string) {
    return (proto: any, functionKey: any) => {

        addReadyHandler(proto);
        if (proto.__gestureListeners) {
            proto.__gestureListeners.push({ targetElem, functionKey, eventName });
            return;
        }

        proto.__gestureListeners = [{ targetElem, functionKey, eventName }];
    };
}

//IE 11 Support
function getName(func: any) {
    return func.name ? func.name : func.toString().match(/^function\s*([^\s(]+)/)[1];
}

function addReadyHandler(proto: any, ) {
    if (proto.__readyHandlerAdded)
        return;

    const ready = proto.ready;
    proto.ready = function registerOnReady(...args: any[]) {
        ready.apply(this, args);

        // console.log("registering " + proto.__gestureListeners.length + " gestures.")
        // console.log("registering " + proto.__listeners.length + " listeners.")

        //Add Polymer Gesture Listeners
        if (proto.__gestureListeners) {
            proto.__gestureListeners.forEach((v: any) => {
                let node = this.$[v.targetElem] || this;
                Polymer.Gestures.addListener(node, v.eventName, (e: any) => { this[v.functionKey](e); });
                // console.log(node, this[v.functionKey].toString(), v.eventName);
            });
        }

        //Add Event Listeners
        if (proto.__listeners) {
            proto.__listeners.forEach((v: any) => {
                let node = this.$[v.targetElem] || this;
                node.addEventListener(v.eventName, (e: any) => { this[v.functionKey](e); });
                // console.log(node, this[v.functionKey].toString(), v.eventName);
            });
        }
    };
    proto.__readyHandlerAdded = true;
}

function customElement(tagname: string) {
    return (klass: any) => {
        klass.is = tagname;
        window.customElements.define(tagname, klass);
    };
}

interface PropertyOptions {
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
}