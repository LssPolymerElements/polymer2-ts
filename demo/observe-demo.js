var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let ObserveDemo = class ObserveDemo extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.observerChangeFired = 0;
        this.count = 0;
        this.a = 0;
        this.aObservedCount = 0;
        this.b = 0;
    }
    ready() {
        super.ready();
        console.log("Observe demo ready.");
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
    property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "observerChangeFired", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "count", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "a", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "aObservedCount", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], ObserveDemo.prototype, "b", void 0);
__decorate([
    observe("count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "countChanged", null);
__decorate([
    observe("a"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "aChanged", null);
__decorate([
    listen("tap", "button"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserveDemo.prototype, "onButtonTap", null);
ObserveDemo = __decorate([
    customElement("observe-demo")
], ObserveDemo);
