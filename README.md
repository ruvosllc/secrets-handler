# secrets-handler

> Store and retrieve JSON secrets securely via AWS SSM.

[![Build Status](https://travis-ci.org/uberops/secrets-handler.svg?branch=master)](https://travis-ci.org/uberops/secrets-handler)

## Installation
`npm install secrets-handler`



## lib/putSecrets
Ingest a `secrets` object and store it as individual parameters in AWS SSM. Returns a promise that resolves to the stored parameters.

```js
const putSecrets = require('secrets-handler').putSecrets

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

#### keyId
Type: `string`  
Default: Your AWS account's default key.  

Specify a KMS key to use when encrypting parameters.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your aws credentials or region.  



## lib/getSecrets
Fetch parameters from AWS SSM and reconstruct them as a secrets object.
```js
const getSecrets = require('secrets-handler').getSecrets

getSecrets({
  path: '/awesome/project',
  awsConfig: { region: 'us-east-1' }
})
.then(secrets => {})
```

### Options


#### path
Type: `string`  

Specify the path prefix of the parameters to fetch.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your AWS credentials or region.  



## bin/putSecrets
Read a secrets object from standard input and store it as individual parameters in AWS SSM.
```
putsecrets [--path | -p <value>] [--overwrite | -o] [--key-id | -k <value>]
```

### Options
`--path` or `-p`  
Specify a path to be used as a prefix on the parameter names. If none is provided a UUID will be used to prevent parameter name collision.

`--overwrite` or `-o`  
Flag indicating that existing parameters should be overwritten.

`--key-id` or `-k`  
Specify a KMS key to use when encrypting parameters. Defaults to your AWS account's default key.


### Example
```
putSecrets --path /awesome/project secrets.json
```



## bin/getSecrets
Fetch a collection of secrets from AWS SSM by path and write them to standard output as a single JSON object.
```
getSecrets [--path | -p <value>]
```

### Options
`--path` or `-p`  
Specify the path prefix of the parameters to fetch. Defaults to `/`.

### Example
```
getSecrets --path /awesome/project
```
