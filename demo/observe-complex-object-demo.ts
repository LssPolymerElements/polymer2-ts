@customElement("observe-complex-object-demo")
class ObserveComplexObjectChangeDemo extends Polymer.Element {

    @property()
    observerChangeFired: number = 0;

    @property()
    complexObject: any = {
        "clickCount": 0
    };

    @property()
    a: any = {};

    ready() {
        super.ready();
        console.log("observe-complex-object-demo demo ready.")
    }

    @observe("complexObject.*")
    countChanged(a: number): void {
        this.observerChangeFired++;
        this.a = JSON.stringify(a);
    }

    @listen("tap", "button")
    onButtonTap() {
        this.set("complexObject.clickCount", this.complexObject.clickCount + 1);
    }

}