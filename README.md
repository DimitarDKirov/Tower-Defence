#JS UI and DOM Online Team "Papaya"
Team work of Papaya for JS UI and DOM Telerik Academy 2015

## Our project is Tower-Defence game

### Team Members
* Александър Павлов -   Alexio86             
* Ангел Ангелов -       angel.angelov.7146557
* Аспарух Христов -     puhabg               
* Божана Нешева  -      bnesheva             
* Борис Кафалиев -      Wolf.Eye             
* Димитър Киров -       dimkirov             
* Емилия Механджиева -  emimehandjieva       
* Иван Иван -           Matrix               
* Мирослав Христов -    mirkatabg            
    
### Project Description

The purpose of the project is to implement a online Tower-Defence game.

When a player opens the index.html page he sees user interface (the menu), from witch he/she can intaract with the application using point device such as mouse or touchpad.
Things that a player can do in the menu:
    * Choose level. Currently there are three levels
    * Why this game was created - About tab.
    * Instructions which gives the user the idea of how to play.
    * Authors - list of the developers names.
    * Credits
    * Hot keys
    
After choosing a level the player can build and upgrade turrets (which costs money and increases score) to kill creeps (which generates money and increases score). 
He/She can experiment with the turrets each has a special ability when fully upgraded.
The objective is to stop the incoming creep waves from going thru the labyrinth.
Also the towers can be saled for less money then the original price  or moved for money.

### Source code
Git repo: <a href="https://github.com/DimitarDKirov/Tower-Defence.git" title="git repo" target="_blank">a link</a>

### Progreass of requirements
#### General Requirements
* Use the HTML5 canvas
* Use SVG
* Create Animations for canvas and SVG

#### Additional Requirements
* Correct naming
* Data encapsulation
* Use OOP and modules
* Strong cohesion
* Use GIT as a source control system

#### Optional Requirements
* Use DOM manipulations like native DOM API and/or jQuery

#### Contributors
* **Емилия Механджиева** - emimehandjieva
    * a
* **Димитър Киров** - dimkirov
    * Create Turret class and inherit turret types.
    * Pack UI functionality as a module.
    * Pack game unit as a module.
    * Refactoring.
    * Added SVG figure on pause screen.
* **Божана Нешева**  - bnesheva
    * Implementation of canvas sprite animation for creep objects, randomization of creep sprite images, customizing creep images for each map.
    * Adding objects for animated blasts and explosions for each turret type.
    * Customized wallpapers for each map, swithed with DOM manipulation with jQuery.
    * Implementation of SVG pseudo-loader animation for the Welcome screen, combined with CSS animation with cross-browser support.
    * Text in Canvas for GameOver screen.
* **Иван Иван** - Matrix
    * a
* **Ангел Ангелов** - angel.angelov.7146557
    * Refactoring - hoisting variables declaration and correct naming for variables.
    * Shooting effects from turrets and explosions.
    * Changed some game balance like slowing factor, cash generation and added more levels for upgrades.

* **Мирослав Христов** - mirkatabg
    * Implementation of **special creep** logic and animating it with canvas.
    * Fixing the position of status-bar when selecting turret and make it *responsive.
    * Refactoring and code ordering.
    * Documentation: Creating TODO and README.

#### Notes
* Александър Павлов - Alexio86
    * The idea for the team project's game was his and he helped with some source code, before the repository was created. 