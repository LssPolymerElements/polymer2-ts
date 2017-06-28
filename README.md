# polymer2-ts

To install use: `bower install --save polymer2-ts`

## Overview  
Typescript behaviors and type definitions for Polymer 2.0.  

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



### computed(name: string)
This function decorator registers a computed property with the provided name.  When one or more associated properties change, 
the computed property is updated. 

```typescript

TypeScript:
class MyElement extends Polymer.Element {
  @property( )
  numOne: numer = 1;
    
  @property( )
  numTwo: numer = 2;
        
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

