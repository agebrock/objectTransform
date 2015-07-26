#objectTransform

Utility library to transform object a little faster. 

## Install

```sh
$ npm install objectTransform --save 
```


## Example
```js
var ts = require('objectTransform');

 var result =  ts.deep({'servername': 'pro.mac', upstreamPort: 7000, upstreamHost: '10.1.16.119', ws: true});
 
 //transforming the camelCase to a deep object structure.
 { servername: 'pro.mac',
   upstream: { port: 7000, host: '10.1.16.119' },
   ws: true }

//convert back to flat object..
ts.flat(result);
 
```

## API


## License
2015 © Christoph Hagenbrock 
