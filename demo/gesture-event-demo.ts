import CustomElement from '../custom-element-decorator.js';
import Property from '../property-decorator.js';
import Listen from '../listen-decorator.js';
import GestureListen from '../gesture-listen-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
import { GestureEventListeners as GestureEventListeners } from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';

@CustomElement('gesture-event-demo')
export class GestureEventDemo extends GestureEventListeners(PolymerElement) {

    static get template() {
        return `<style>
                    :host {
                    display: block;
                }

                .click-box {
                    height: 100px;
                    width: 200px;
                    border: 1px dashed grey;
                    cursor: pointer;
                }

                .event-msg {
                    width: 200px;
                    text-align: center;
                    padding: 8px;
                }
            </style>
            <div id="click-box" class="click-box"></div>
            <div class="event-msg">Clicked [[clickCount]] times</div>
            <div class="event-msg">Mouseover: [[isMouseOver]]</div>`;
    }

    @Property()
    clickCount: number = 0;

    @Property()
    isMouseOver: boolean = false;

    ready() {
        super.ready();
        console.log('Gesture demo ready.');
    }

    @GestureListen('tap', 'click-box')
    onClick() {
        this.clickCount++;
    }

    @Listen('mouseover', 'click-box')
    onMouseOver() {
        this.isMouseOver = true;
    }

    @Listen('mouseout', 'click-box')
    onMouseOut() {
        this.isMouseOver = false;
    }
}