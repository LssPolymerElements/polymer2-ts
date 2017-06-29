@customElement("gesture-event")
class GestureEvent extends Polymer.GestureEventListeners(Polymer.Element) {

    @property()
    clickCount: number = 0;

    @property()
    isMouseOver: boolean = false;

    ready() {
        super.ready();
        console.log("Gesture demo ready.")
    }

    @gestureListen("tap", "click-box")
    onClick() {
        this.clickCount++;
    }

    @listen("mouseover", "click-box")
    onMouseOver() {
        this.isMouseOver = true;
    }

    @listen("mouseout", "click-box")
    onMouseOut() {
        this.isMouseOver = false;
    }


}