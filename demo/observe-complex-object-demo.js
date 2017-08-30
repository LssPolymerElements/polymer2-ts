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
let ObserveComplexObjectChangeDemo = class ObserveComplexObjectChangeDemo extends PolymerElement {
    constructor() {
        super(...arguments);
        this.observerChangeFired = 0;
        this.complexObject = {
            'clickCount': 0
        };
        this.a = {};
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
    ready() {
        super.ready();
        console.log('observe-complex-object-demo demo ready.');
    }
    countChanged(a) {
        this.observerChangeFired++;
        this.a = JSON.stringify(a);
    }
    onButtonTap() {
        this.set('complexObject.clickCount', this.complexObject.clickCount + 1);
    }
};
__decorate([
    Property(),
    __metadata("design:type", Number)
], ObserveComplexObjectChangeDemo.prototype, "observerChangeFired", void 0);
__decorate([
    Property(),
    __metadata("design:type", Object)
], ObserveComplexObjectChangeDemo.prototype, "complexObject", void 0);
__decorate([
    Property(),
    __metadata("design:type", Object)
], ObserveComplexObjectChangeDemo.prototype, "a", void 0);
__decorate([
    Observe('complexObject.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveComplexObjectChangeDemo.prototype, "countChanged", null);
__decorate([
    Listen('click', 'button'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserveComplexObjectChangeDemo.prototype, "onButtonTap", null);
ObserveComplexObjectChangeDemo = __decorate([
    CustomElement('observe-complex-object-demo')
], ObserveComplexObjectChangeDemo);
