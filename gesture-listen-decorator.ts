import OnReadyHandler from './on-ready-handler.js';

export function GestureListen(eventName: string, targetElem?: string) {
    return (proto: any, functionKey: any) => {

        if (!proto._addEventListenerToNode || proto._addEventListenerToNode.toString().indexOf('gesture') === -1) {
            throw new Error('Polymer.Gestures not detected.  You must extend Polymer.GestureEventListeners(Polymer.Element) when using the gestureListen() decorator');
        }
        OnReadyHandler(proto);
        if (proto.__gestureListeners) {
            proto.__gestureListeners.push({ targetElem, functionKey, eventName });
            return;
        }

        proto.__gestureListeners = [{ targetElem, functionKey, eventName }];
    };
}