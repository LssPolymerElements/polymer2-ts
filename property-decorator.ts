import Reflect from './lib/Reflect.js';

export default function Property<T>(options?: PropertyOptions) {
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

export interface PropertyOptions {
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
}