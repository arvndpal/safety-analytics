<details>
    <summary> How JavaScript works?</summary>
    <p>Everything in JavaScript happens inside an "execution context".

Execution context has two component

1. memory component[variable environment]
   -This is the place where all variables and functions are stored as key value pairs. eg-{key: value || n:2;}

2. code component[Thread of execution]
   -This is the place where code is executed one line at a time

Note-
JavaScript is a synchronous single-threaded language

-Single threaded means JavaScript can execute once command at a time
-Synchronous single-threaded that means JavaScript can execute one command at a time in a specific order.

</p>
</details>

<details>
    <summary>How JS Code is executed</summary>
    <p>
     the entire execution happens in two phases as follows:

1. Memory allocation phase- all the variables and functions get their memory allocated in the memory with undefined and the entire code respectively.
2. Code execution phase - in this phase thread execution happens and all the variables get their actual values which were assigned to them and as function is invoked, a new execution environment gets created in the code part, and again there are two phases, memory allocation phase and code execution phase. And the cycle repeats.
</p>
</details>

<details>
    <summary>Hoisting</summary>
    <p>
 
1. In JS, before the code is executed, the variables get initialized to undefined.
2. Arrow functions enact as variables and get "undefined" during the memory creation phase while functions actually get run.
3. Hoisting: Mechanism in JS where the variable declarations are moved to the top of the scope before execution. Therefore it is possible to call a function before initializing it.
4. Whenever a JS program is run, a global execution block is created, which comprises of 2: Memory creation and Code execution.
5. Variable declarations are scanned and are made undefined
6. Function declarations are scanned and are made available
    </p>
</details>

<details>
    <summary>How Function Works in Javascript</summary>
    <p>

1. At first a global execution context is created, which consists of Memory and code and has 2 phases: Memory allocation phase and code execution phase.
2. In the first phase, the variables are assigned "undefined" while functions have their own code.
3. Whenever there is a function declaration in the code, a separate local execution context gets created having its own phases and is pushed into the call stack.
4. Once the function ends, the EC is removed from the call stack.
5. When the program ends, even the global EC is pulled out of the call stack.
</p>
</details>

<details>
    <summary>Let Const and Temporal DeadZone</summary>
    <p>

1. let and const are hoisted but its memory is allocated at other place than window which cannot be accessed before initialisation.
2. Temporal Dead Zone exists until variable is declared and assigned a value.
3. window.variable OR this.variable will not give value of variable defined using let or const.
4. We cannot redeclare the same variable with let/const(even with using var the second time).
5. const variable declaration and initialisation must be done on the same line.
6. There are three types of error: [1] referenceError {given where variable does not have memory allocation} [2] typeError {given when we change type that is not supposed to be changed} [3] syntaxError {when proper syntax(way of writing a statement) is not used}.
7. Use const wherever possible followed by let, Use var as little as possible(only if you have to). It helps avoid error.
8. Initialising variables at the top is good idea, helps shrinks TDZ to zero.
</p>
</details>

<details>
    <summary>BLOCK SCOPE & Shadowing in JS</summary>
    <p>

1. Code inside curly bracket is called block.
2. Multiple statements are grouped inside a block so it can be written where JS expects single statements like in if, else, loop, function etc.
3. Block values are stored inside separate memory than global. They are stored in block. (the reason let and const are called block scope)
4. Shadowing of variables using var, let and const.
5. The shadow should not cross the scope of original otherwise it will give error.
6. shadowing let with var is illegal shadowing and gives error.
7. var value is stored in nearest outer function or global scope and hence can be accessed outside block as well whereas same is not the case with let and const.
</p>
</details>

<details>
    <summary>Scope and lexical environment</summary>
    <p>

1. Scope of a variable is directly dependent on the lexical environment.
2. Whenever an execution context is created, a lexical environment is created. Lexical environment is the local memory along with the lexical environment of its parent. Lexical as a term means in hierarchy or in sequence.
3. Having the reference of parent's lexical environment means, the child or the local function can access all the variables and functions defined in the memory space of its lexical parent.
4. The JS engine first searches for a variable in the current local memory space, if its not found here it searches for the variable in the lexical environment of its parent, and if its still not found, then it searches that variable in the subsequent lexical environments, and the sequence goes on until the variable is found in some lexical environment or the lexical environment becomes NULL.
5. The mechanism of searching variables in the subsequent lexical environments is known as Scope Chain. If a variable is not found anywhere, then we say that the variable is not present in the scope chain.
</p>
</details>
<details>
    <summary> Event Loop</summary>
    <p>
    Javascript is s Syncronus, single threaded language. It has one call stack and it can do only one thing at a time . This call stack is present in Javascript Engine and  all the javascript code executes in call this call stack
    </p>
    <p>Whenever any javascript code runs a global execution Context is created and pushed into call stack and all the code run line by line</p>
</details>
