export default function Observe(targets: string | string[]) {
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