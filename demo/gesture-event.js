var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let GestureEvent = class GestureEvent extends Polymer.GestureEventListeners(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.clickCount = 0;
        this.isMouseOver = false;
    }
    ready() {
        super.ready();
        console.log("Gesture demo ready.");
    }
    onClick() {
        this.clickCount++;
    }
    onMouseOver() {
        this.isMouseOver = true;
    }
    onMouseOut() {
        this.isMouseOver = false;
    }
};
__decorate([
    property(),
    __metadata("design:type", Number)
], GestureEvent.prototype, "clickCount", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], GestureEvent.prototype, "isMouseOver", void 0);
__decorate([
    gestureListen("tap", "click-box"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GestureEvent.prototype, "onClick", null);
__decorate([
    listen("mouseover", "click-box"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GestureEvent.prototype, "onMouseOver", null);
__decorate([
    listen("mouseout", "click-box"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GestureEvent.prototype, "onMouseOut", null);
GestureEvent = __decorate([
    customElement("gesture-event")
], GestureEvent);
