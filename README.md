# param-handler

> Store and retrieve parameters securely via AWS SSM.

## Installation
`npm install` or `git clone`


## putSecrets.js
Ingest a `secrets` object and store it as individual parameters in AWS SSM. Returns a promise that resolves to the stored parameters.
```
const putSecrets = require('param-handler').putSecrets

putSecrets({
  secrets: { some: 'secrets' },
  path: '/awesome/project',
  overwrite: true,
  awsConfig: { region: 'us-east-1' }
})
.then(parameters => {})
```

### Options

#### secrets
Type: `object`  

An object containing the secrets you'd like to store.  


#### path
Type: `string`  
Default: `uuid()`  

Specify a path to be used as a prefix on the parameter names. If none is provided a UUID will be used to prevent parameter name collision.


#### overwrite
Type: `boolean`  
Default: `false`  

Flag indicating that existing parameters should be overwritten.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your aws credentials or region.  



## getSecrets.js
Fetch parameters from AWS SSM and reconstruct them as a secrets object.
```
const getSecrets = require('param-handler').getSecrets

getSecrets({
  path: '/awesome/project',
  awsConfig: { region: 'us-east-1' }
})
.then(secrets => {})
```

### Options


#### path
Type: `string`  

Specify a path to be used as a prefix for fetched parameters.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your aws credentials or region.  



## putSecrets.sh
Ingest a local JSON file and store it as individual parameters in AWS SSM.
```
putSecrets.sh [--path | -p <value>] [--overwrite | -o] [--quiet | -q] <filename>
```

### Options
`--path` or `-p`  
Specify a path to be used as a prefix on the parameter names. If none is provided a UUID will be used to prevent parameter name collision.

`--overwrite` or `-o`  
Flag indicating that existing parameters should be overwritten.

`--quiet` or `-q`  
Quiet down and log fewer things.

`<filename>`  
Specifies a JSON file from which to read the secrets.  Defaults to `secrets.json`.


### Example
```
putSecrets.sh --path /awesome/project secrets.json
```

## getSecrets.sh
Fetch a collection of secrets from AWS SSM by path and write them to standard output as a single JSON object.
```
getSecrets.sh [--path | -p <value>]
```

### Options
`--path` or `-p`  
Specify a path to be used as a prefix for fetched parameters. Defaults to `/`.

### Example
```
getSecrets.sh --path /awesome/project
```
