/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor 
  
  functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  
  
  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

const GameObject = function(args){
  this.createdAt = args.createdAt;
  this.name = args.name;
  this.dimensions = args.dimensions;
}

GameObject.prototype.destroy = function(){
  return `${this.name} was removed from the game.`
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

const CharacterStats = function(charAttrs){

  GameObject.call(this, charAttrs);

  this.healthPoints = charAttrs.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(){
  return `${this.name} took damage.`
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

const Humanoid = function(humanoidData){
  CharacterStats.call(this, humanoidData);
  this.team = humanoidData.team;
  this.weapons = humanoidData.weapons;
  this.language = humanoidData.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function(){
  return `${this.name} offers a greeting in ${this.language}`;
}

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  const Hero = function(heroArgs){
    Humanoid.call(this, heroArgs);
    this.damageDealtToEnemies = heroArgs.damageDealtToEnemies;
  }

  Hero.prototype = Object.create(Humanoid.prototype);
  

  // Hero.prototype.takeHit

  Hero.prototype.hit = function(giveOrTake, target, attackPoints){
    
    switch(giveOrTake === 'take'){

      case true: 
                 this.healthPoints -= attackPoints;
                 // I could have used the inherited takeDamage method, but wanted to console log damage and HP in this case.
                 this.healthPoints > 0 ? console.log(`${this.name} took ${attackPoints} damage: HP is now ${this.healthPoints}`) : console.log(this.destroy());
                 break;

      case false: 
                 //I could have either created another prototype method to handle taking damage or updated the existing takeDamage method to be more sophisticated
                 //However chose to do it this way to practice using .apply
                 this.hit.apply(target, ['take', target, attackPoints]);
                 break;
    }

    return;
  }




  const Villain = function(villainArgs){
    Hero.call(this, villainArgs);
    this.evilLaugh = villainArgs.evilLaugh;
  }

  Villain.prototype = Object.create(Hero.prototype);
  Villain.prototype.laughInEvil = function(){
    console.log(`${this.name} cackles, ${this.evilLaugh}!!!`);
  }


  const char1 = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Steve',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
    damageDealtToEnemies: 0
  });


  const char2 = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Edward',
    team: 'Murder Kingdom',
    weapons: [
      'Glock',
      'Ruger',
    ],
    language: 'Elvish',
    damageDealtToEnemies: 0,
    evilLaugh: 'Muahahaha'
  });

  char1.hit('give', char2, 5);

  char1.hit('give', char2, 4);

  char2.hit('give', char1, 10);

  char2.laughInEvil();