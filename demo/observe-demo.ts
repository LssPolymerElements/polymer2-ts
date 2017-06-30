@customElement("observe-demo")
class ObserveDemo extends Polymer.Element {

    @property()
    observerChangeFired: number = 0;

    @property()
    count: number = 0;

    @property()
    a: number = 0;

    @property()
    aObservedCount: number = 0;

    @property()
    b: number = 0;

    ready() {
        super.ready();
        console.log("Observe demo ready.")
    }

    @observe("count")
    countChanged(a: number): void {
        this.observerChangeFired++;
        this.a = a;
    }

    @observe("a")
    aChanged(a: number): void {
        this.aObservedCount++;
    }

    @listen("tap", "button")
    onButtonTap() {
        this.count++;
    }

}