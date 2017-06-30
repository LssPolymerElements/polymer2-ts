var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let ObserveComplexObjectChangeDemo = class ObserveComplexObjectChangeDemo extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.observerChangeFired = 0;
        this.complexObject = {
            "clickCount": 0
        };
        this.a = {};
    }
    ready() {
        super.ready();
        console.log("observe-complex-object-demo demo ready.");
    }
    countChanged(a) {
        this.observerChangeFired++;
        this.a = JSON.stringify(a);
    }
    onButtonTap() {
        this.set("complexObject.clickCount", this.complexObject.clickCount + 1);
    }
};
__decorate([
    property(),
    __metadata("design:type", Number)
], ObserveComplexObjectChangeDemo.prototype, "observerChangeFired", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ObserveComplexObjectChangeDemo.prototype, "complexObject", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ObserveComplexObjectChangeDemo.prototype, "a", void 0);
__decorate([
    observe("complexObject.*"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveComplexObjectChangeDemo.prototype, "countChanged", null);
__decorate([
    listen("tap", "button"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserveComplexObjectChangeDemo.prototype, "onButtonTap", null);
ObserveComplexObjectChangeDemo = __decorate([
    customElement("observe-complex-object-demo")
], ObserveComplexObjectChangeDemo);
