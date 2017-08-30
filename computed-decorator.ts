export default function Computed<T>(name: string) {
    return (proto: any, propName: string): any => {
        let funcText = proto[propName].toString();
        let start = funcText.indexOf('(');
        let end = funcText.indexOf(')');
        let propertiesList = funcText.substring(start + 1, end);
        function getName(func: any) {
            return func.name ? func.name : func.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        let signature = getName(proto[propName]) + '(' + propertiesList + ')';
        proto.constructor.createComputedProperty(name, signature, true);
    };
}

