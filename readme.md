# Install  
`npm install iprange-cidr`

# About  
Module for generating CIDR value with ip range.

# Example  

```js
const IPCIDR = require("iprange-cidr");
const ipRange = new IPCIDR("46.28.104.0","46.28.111.255"); 


// get cidr of ip range
ipRange.iprange2cidr(); 

```


