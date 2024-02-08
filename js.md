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
    <summary> Event Loop</summary>
    <p>
    Javascript is s Syncronus, single threaded language. It has one call stack and it can do only one thing at a time . This call stack is present in Javascript Engine and  all the javascript code executes in call this call stack
    </p>
    <p>Whenever any javascript code runs a global execution Context is created and pushed into call stack and all the code run line by line</p>
</details>
