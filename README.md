# polymer-ts 3.0 PREVIEW

[![Build status](https://ci.appveyor.com/api/projects/status/ama6h2kudvjiwapy?svg=true)](https://ci.appveyor.com/project/aarondrabeck/polymer2-ts)

To install use: `yarn add @leavittsoftware/polymer-ts`

## Change Log
Changes from 2.0 to 3.0-preview
 - Uses ES6 Modules rather than HTML imports.
 - Decorators are now title case. 

## Overview  
Typescript decorators and type definitions for Polymer 3.0  

## Available Behaviors



### @CustomElement()
This class decorator will automatically add the is() getter and register your element. 

```typescript

import CustomElement from '../node_modules/@leavittsoftware/polymer-ts/custom-element-decorator.js';
@CustomElement("my-element")
class MyElement extends PolymerElement {

}

```


### @Property(options?: PropertyOptions)
This property decorator will register your properties for you. Do not declare a properties getter.  The type is inferred by the type declared in TypeScript.  Assign defaults to the property directly. 

```typescript

import Property from '../node_modules/@leavittsoftware/polymer-ts/property-decorator.js';
export class MyElement extends PolymerElement {

    @Property({ reflectToAttribute: true, notify: true })
    shape: string = "circle";
    
    @Property()
    size: number = 60;    
}

```
#### Available PropertyOptions:
```
    notify?: boolean;
    reflectToAttribute?: boolean;
    readOnly?: boolean;
```


### @Listen(eventName: string, targetElem?: string)
This function decorator adds an event listener for the provided event name and calls back the function when the event is fired.

TypeScript:
```typescript

import Listen from '../node_modules/@leavittsoftware/polymer-ts/listen-decorator.js';
export class MyElement extends PolymerElement {

 //Listen for tap events on the element with an id="submitButton"
  @Listen("tap", "submitButton")
  submitButtonTapHandler(e){
      doSomething();
  }
  
  //Listen for all tap events on MyElement
  @Listen("tap")
  tapHandler(e){
      doSomething();
  }
  
  static get template(){
      return `<paper-button id="submitButton">Submit</paper-button>`;
  }
}
```


### @GestureListen(eventName: string, targetElem?: string)
This function decorator adds an polymer [gesture listener](https://www.polymer-project.org/2.0/docs/devguide/gesture-events) for the provided event name and calls back the function when the event is fired.

IMPORTANT: When using this decorator your class must apply the gesture mix-in.
```
<script>
    
    export class TestEvent extends GestureEventListeners(PolymerElement) {
      ...
</script>
```

TypeScript:
```typescript

import Property from '../node_modules/@leavittsoftware/polymer-ts/property-decorator.js';
import GestureListen from '../node_modules/@leavittsoftware/polymer-ts/gesture-listen-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

export class MyElement extends PolymerElement {

 //Listen for tap events on the element with an id="submitButton"
  @GestureListen("tap", "submitButton")
  submitButtonTapHandler(e){
      doSomething();
  }
  
  //Listen for all tap events on MyElement
  @GestureListen("tap")
  tapHandler(e){
      doSomething();
  }

  static get template() { return '<paper-button id="submitButton">Submit</paper-button>'; }
}
```

### Computed(name: string)
This function decorator registers a computed property with the provided name.  When one or more associated properties change, 
the computed property is updated. 

```typescript

TypeScript:

import Property from '../node_modules/@leavittsoftware/polymer-ts/property-decorator.js';
import Computed from '../node_modules/@leavittsoftware/polymer-ts/computed-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

export class MyElement extends PolymerElement {
  @Property( )
  numOne: number = 1;
    
  @Property( )
  numTwo: number = 2;
        
  @Computed('total')
  getSrc(numOne: number, numTwo: number) : number {
    return numOne + numTwo;
  }
  
  static get template(){ return '<h1>[[total]]</h1>'; }
}
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
    "target": "ES6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "sourceMap": false,
    "allowJs": true,
    "lib": ["es2017", "dom"],
    "typeRoots": ["types"]
  },
  "exclude": [    
    "node_modules"
  ]
}
```


## Example
my-element.ts
```typescript

import CustomElement from '../node_modules/@leavittsoftware/polymer-ts/custom-element-decorator.js';
import Property from '../node_modules/@leavittsoftware/polymer-ts/property-decorator.js';
import Observe from '../node_modules/@leavittsoftware/polymer-ts/observe-decorator.js';
import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

@CustomElement("my-element")
export class MyElement extends PolymerElement {
      
    @Property({ notify: true })
    personId: number = 44;

    @Property()
    size: number = 60;

    @Observe('size')
    _sizeChanged(size) {
        console.log("size changed to " + size);
    }
    
    @Computed('src')
    _computePictureSrc(personId: number, size: number) {
        var baseUrl = this.isDev() ? "https://dev.example.com/" : "https://example.com/";
        return `${baseUrl}Picture(${personId})/Default.Picture(size=${size})`;
    }
    
    static get template() {
        return `<style>
                 :host {
                    display: block;
                }            
          </style>
          <img src="{{src}}" style="height:[[size]]"></img>`;
    }
}
```
