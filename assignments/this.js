/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Global "window" Binding --> "this" is bound to the environment in which it is referencing (i.e. the window or console)
* 2. Implicit Binding --> Whenever "this" is called with a dot within an object the object "before" it (which encapsulates it) becomes "this"
* 3. New Binding --> Similar to implicit, however specific to the instance in which it is being called, takes on attributes of constructor args.
* 4. Explicit Binding --> "over-ride" binding, using .call or .apply to set the context for "this".
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

console.log(this);

// Principle 2

// code example for Implicit Binding

const thisObj = {
    name: 'tHiS',
    tellMe: function(){
        console.log(this);
        return this;
    }
}

thisObj.tellMe();

// Principle 3

// code example for New Binding

function HereIGo(args){
    this.name = args.name;
    this.verb = args.verb;
    this.speak = function(){
        return `${this.name} says, "Here I go ${this.verb}ing again. ${this}`
    }
}

let josh = new HereIGo({
    name: 'Josh',
    verb: 'kill'
});

console.log(josh.speak());

// Principle 4

// code example for Explicit Binding

let lazyJim = function(verb){
    this.name = 'Jim';
    this.verb =  verb;
}

let jim = new lazyJim('sleep');

console.log(josh.speak.call(jim));