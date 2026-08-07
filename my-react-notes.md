my-react-notes



react is a javascript library for building dynamic and interactive user interfaces. it was created in 2011 by facebook





creating a react app:

npm create vite@latest my-react-app -- --template react



cd my-react-app

npm install

npm run dev





npx create-react-app my-app



Why create-react-app Was StoppedThe React team officially sunsetted CRA due to a combination of severe performance bottlenecks, lack of modern features, and abandonment by its maintainers





Functional components are the modern standard in React development, while class components are considered legacy. According to the Official React Documentation, the React team recommends defining components as functions instead of classes for all new code. \[1, 2]

Quick Comparison

(some content is missed in the table.

| Feature \[1, 3, 4, 5, 6, 7, 8] | Functional Components | Class Components  |

| --- | --- | --- |

| Syntax | Standard JavaScript functions | ES6 classes extending  |

| State Management | Handled via the  usestate Hook | Handled via  this.state object and  |

| Lifecycle Methods | Handled via the useeffect Hook | Handled via explicit methods like  |

| The this Keyword | Not required | Required to access props, state, and methods  |

| Boilerplate | Very minimal and concise | Verbose; requires constructors and explicit bindings  |





follow PascalCasing for function names.



ES Modules stands for ECMAScript Modules

ECMAScript (ES) is the standardized scripting language specification that serves as the rulebook and foundation for JavaScript.



In JavaScript, there are two primary module systems used to handle importing and exporting code: ES Modules (ESM), which is the modern native standard, and CommonJS (CJS), which is traditionally used in Node.js environments. \[1, 2, 3, 4, 5]

1\. ES Modules (Modern Browser \& Node.js) \[6, 7]

ES Modules use the  and  statements. You can read more about it on the MDN Web Docs for import and MDN Web Docs for export. \[2, 8, 9]

A. Named Exports Used when you want to export multiple variables, functions, or classes from a single file. \[10, 11]

B. Default Exports Used when a module has a main fallback feature or only exports one thing. You can name it whatever you like when importing. \[10, 11, 12, 13]

C. Namespace Import (Import All) Grabs all named and default exports from a file and bundles them into a single object wrapper. \[8, 10]

D. Renaming Imports / Aliasing Avoids variable name collisions by renaming imports inline with the  keyword. \[14]

E. Dynamic Imports Loads modules conditionally or on-demand asynchronously using a function-like syntax. \[2, 15, 16]

2\. CommonJS Modules (Node.js Legacy Standard)



named export:

// mathUtils.js (The Export)

export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;



// main.js (The Import)

import { add, subtract } from './mathUtils.js';

console.log(add(5, 3)); // 8



default export:

// calculator.js (The Export)

const multiply = (a, b) => a \* b;

export default multiply;



// main.js (The Import)

import calcMultiply from './calculator.js';

console.log(calcMultiply(4, 2)); // 8



namespace import:

// main.js (The Import)

import \* as MathTools from './mathUtils.js';

console.log(MathTools.add(1, 2));



aliasing/renaming:

// main.js (The Import)

import { add as sum } from './mathUtils.js';

console.log(sum(10, 10)); // 20



dynamic imports:

// main.js (The Import)

if (condition) {

&#x20; import('./mathUtils.js').then((math) => {

&#x20;   console.log(math.add(5, 5));

&#x20; });

}



multiple exports:

// logger.js (The Export)

function info(msg) { console.log(`INFO: ${msg}`); }

function error(msg) { console.error(`ERROR: ${msg}`); }



module.exports = { info, error };



// main.js (The Import)

const { info, error } = require('./logger.js');

info('System running.');



single/default export:

// database.js (The Export)

class Database {

&#x20; connect() { console.log('Connected'); }

}

module.exports = Database;



// main.js (The Import)

const DB = require('./database.js');

const myDb = new DB();

myDb.connect();





**library vs framework:**

Your code calls the library. ||The framework calls your code.

A toolbox where you grab tools. ||A pre-built house where you fill rooms.





**fragment**: used to avoid adding extra div to wrap multiple elements like h1 etc.



true \&\& 1

output = 1;

true \&\& 'abc' output = abc.

(use to avoid writing null in if or ternary statements.)

