import CustomElement from '../custom-element-decorator.js';
import Property from '../property-decorator.js';
import Observe from '../observe-decorator.js';
import Listen from '../listen-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

@CustomElement('observe-complex-object-demo')
class ObserveComplexObjectChangeDemo extends PolymerElement {

    static get template() {
        return `<style>
                    :host {
                    @apply --layout-vertical;
                }

                .event-msg {
                    text-align: center;
                    margin: 8px;
                }

                paper-button {
                    @apply --layout-center;
                    margin: 8px;
                    background-color: var(--paper-indigo-500);
                    color: white;
                    --paper-button-raised-keyboard-focus: {
                        background-color: var(--paper-pink-a200) !important;
                        color: white !important;
                    }
                    ;
                }
            </style>

            <div class="event-msg">Click Count: [[complexObject.clickCount]]</div>

            <div class="event-msg">Change Event Observed: [[observerChangeFired]]</div>
            <div class="event-msg">Click New Value: [[a]]</div>

            <button raised id="button">Increment Click Count</button>`;
    }

    @Property()
    observerChangeFired: number = 0;

    @Property()
    complexObject: any = {
        'clickCount': 0
    };

    @Property()
    a: any = {};

    ready() {
        super.ready();
        console.log('observe-complex-object-demo demo ready.');
    }

    @Observe('complexObject.*')
    countChanged(a: number): void {
        this.observerChangeFired++;
        this.a = JSON.stringify(a);
    }

    @Listen('click', 'button')
    onButtonTap() {
        this.set('complexObject.clickCount', this.complexObject.clickCount + 1);
    }

}