# polymer2-ts

[![Build status](https://ci.appveyor.com/api/projects/status/ama6h2kudvjiwapy?svg=true)](https://ci.appveyor.com/project/aarondrabeck/polymer2-ts)

To install use: `bower install --save polymer2-ts`

## Overview  
Typescript decorators and type definitions for Polymer 2.0.  

## Available Behaviors



### @customElement()
This class decorator will automatically add the is() getter and register your element. 

```typescript

@customElement("my-element")
class MyElement extends Polymer.Element {

}

```


### @property(options?: PropertyOptions)
This property decorator will register your properties for you. Do not declare a properties getter.  The type is inferred by the type declared in TypeScript.  Assign defaults to the property directly. 

```typescript

class MyElement extends Polymer.Element {

    @property({ reflectToAttribute: true, notify: true })
    shape: string = "circle";
    
    @property()
    size: number = 60;    
}

```
#### Available PropertyOptions:
```
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
```


### @listen(eventName: string, targetElem?: string)
This function decorator adds an event listener for the provided event name and calls back the function when the event is fired.

TypeScript:
```typescript
class MyElement extends Polymer.Element {

 //Listen for tap events on the element with an id="submitButton"
  @listen("tap", "submitButton")
  submitButtonTapHandler(e){
      doSomething();
  }
  
  //Listen for all tap events on MyElement
  @listen("tap")
  tapHandler(e){
      doSomething();
  }
}
```
HTML:
```html
<paper-button id="submitButton">Submit</paper-button>
```

### @gestureListen(eventName: string, targetElem?: string)
This function decorator adds an polymer [gesture listener](https://www.polymer-project.org/2.0/docs/devguide/gesture-events) for the provided event name and calls back the function when the event is fired.

IMPORTANT: When using this decorator your class must apply the gesture mix-in.
```
<link rel="import" href="polymer/lib/mixins/gesture-event-listeners.html">

<script>
    class TestEvent extends Polymer.GestureEventListeners(Polymer.Element) {
      ...
</script>
```

TypeScript:
```typescript
class MyElement extends Polymer.Element {

 //Listen for tap events on the element with an id="submitButton"
  @listen("tap", "submitButton")
  submitButtonTapHandler(e){
      doSomething();
  }
  
  //Listen for all tap events on MyElement
  @listen("tap")
  tapHandler(e){
      doSomething();
  }
}
```
HTML:
```html
<paper-button id="submitButton">Submit</paper-button>
```



### computed(name: string)
This function decorator registers a computed property with the provided name.  When one or more associated properties change, 
the computed property is updated. 

```typescript

TypeScript:
class MyElement extends Polymer.Element {
  @property( )
  numOne: number = 1;
    
  @property( )
  numTwo: number = 2;
        
  @computed('total')
  getSrc(numOne: number, numTwo: number) : number {
    return numOne + numTwo;
  }
}
```
HTML:
```html
<h1>[[total]]</h1>
```
Result:
```html
<h1>3</h1>
```

## Recommended TypeScript Config 
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "es2015",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "sourceMap": false,
    "lib": ["es2017", "dom"],
    "typeRoots": ["types"]
  },
  "exclude": [    
    "node_modules",
    "bower_components/reflect-metadata/"
  ]
}
```


## Example
my-element.ts
```typescript
@customElement("my-element")
class MyElement extends Polymer.Element {

    @property({ notify: true })
    personId: number = 44;

    @property()
    size: number = 60;

    @observe('size')
    _sizeChanged(size) {
        console.log("size changed to " + size);
    }
    
    @computed('src')
    _computePictureSrc(personId: number, size: number) {
        var baseUrl = this.isDev() ? "https://dev.example.com/" : "https://example.com/";
        return `${baseUrl}Picture(${personId})/Default.Picture(size=${size})`;
    }
}
```
my-element.html
```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../polymer2-ts/polymer2-ts.html">

<dom-module id="my-element">
    <template>
        <style>
             :host {
                display: block;
            }            
        </style>
        <img src="{{src}}" style="height:[[size]]"></img>
    </template>
    <script type="text/javascript" src="my-element.js"></script>
</dom-module>

```
