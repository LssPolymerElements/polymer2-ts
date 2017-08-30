var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import CustomElement from '../custom-element-decorator.js';
import Property from '../property-decorator.js';
import Observe from '../observe-decorator.js';
import Listen from '../listen-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
let ObserveDemo = class ObserveDemo extends PolymerElement {
    constructor() {
        super(...arguments);
        this.observerChangeFired = 0;
        this.count = 0;
        this.a = 0;
        this.aObservedCount = 0;
        this.b = 0;
    }
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
    ready() {
        super.ready();
        console.log('Observe demo ready.');
    }
    countChanged(a) {
        this.observerChangeFired++;
        this.a = a;
    }
    aChanged(a) {
        this.aObservedCount++;
    }
    onButtonTap() {
        this.count++;
    }
};
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "observerChangeFired", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "count", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "a", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "aObservedCount", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "b", void 0);
__decorate([
    Observe('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "countChanged", null);
__decorate([
    Observe('a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "aChanged", null);
__decorate([
    Listen('click', 'button'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "onButtonTap", null);
ObserveDemo = __decorate([
    CustomElement('observe-demo')
], ObserveDemo);
export { ObserveDemo };
