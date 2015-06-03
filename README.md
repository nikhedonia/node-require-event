# example

```js

var req = require('require-event');

req.on( /before:.*/ , console.log.bind(console) ); // notifies before require of any file is requires
req.on( /after:.*/ , console.log.bind(console) ); // 
req.on( 'before:fs' , function(){} );

req.hook(); // hook emmett in

var fs = require('fs'); // get notified...

req.unhook(); // unhook

req.debug() // makes require output every event into console; 

```
