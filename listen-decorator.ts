import addReadyHandler from './on-ready-handler.js';

export default function Listen(eventName: string, targetElem?: string) {
    return (proto: any, functionKey: any) => {
        addReadyHandler(proto);
        if (proto.__listeners) {
            proto.__listeners.push({ targetElem, functionKey, eventName });
            return;
        }

        proto.__listeners = [{ targetElem, functionKey, eventName }];
    };
}

