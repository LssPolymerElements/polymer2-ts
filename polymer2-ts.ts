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

function computed<T>(name: string) {
    return (proto: any, propName: string): any => {
        let funcText = proto[propName].toString();
        let start = funcText.indexOf('(');
        let end = funcText.indexOf(')');
        let propertiesList = funcText.substring(start + 1, end);
        let signature = getName(proto[propName]) + '(' + propertiesList + ')';
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
        if (type) propConfig.type = true;
        if (notify) propConfig.notify = true;
        if (reflect) propConfig.reflectToAttribute = true;

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
function getName(func: any) {
    return func.name ? func.name : func.toString().match(/^function\s*([^\s(]+)/)[1];
}

function addReadyHandler(proto: any, ) {
    if (getName(proto.ready) === 'registerOnReady')
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