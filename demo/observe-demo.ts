import CustomElement from '../custom-element-decorator.js';
import Property from '../property-decorator.js';
import Observe from '../observe-decorator.js';
import Listen from '../listen-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

@CustomElement('observe-demo')
export class ObserveDemo extends PolymerElement {

    static get template() {
        return `<style>
        :host {
           @apply --layout-vertical;
       }

       .event-msg {
           text-align: center;
           margin: 8px;
       }

       button {
           margin: 8px;
           background-color: blue;
           color: white;
       }
   </style>
   <button raised id="button">Increment Click Count</button>
   <div class="event-msg">Click Count: [[count]]</div>

   <div class="event-msg">Change Event Observed: [[observerChangeFired]]</div>
   <div class="event-msg">Click New Value: [[a]]</div>

   <div class="event-msg">New Value Observed: [[aObservedCount]]</div>`;
    }

    @Property()
    observerChangeFired: number = 0;

    @Property()
    count: number = 0;

    @Property()
    a: number = 0;

    @Property()
    aObservedCount: number = 0;

    @Property()
    b: number = 0;

    ready() {
        super.ready();
        console.log('Observe demo ready.');
    }

    @Observe('count')
    countChanged(a: number): void {
        this.observerChangeFired++;
        this.a = a;
    }

    @Observe('a')
    aChanged(a: number): void {
        this.aObservedCount++;
    }

    @Listen('click', 'button')
    onButtonTap() {
        this.count++;
    }

}