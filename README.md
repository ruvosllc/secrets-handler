# secrets-handler

> Store and retrieve JSON secrets securely via AWS SSM.

[![Build Status](https://travis-ci.org/uberops/secrets-handler.svg?branch=master)](https://travis-ci.org/uberops/secrets-handler)

## Installation
`npm install secrets-handler`



## CLI Usage
```
> secrets-handler --help

Usage: secrets-handler [command] [options]


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  get <path>            Fetch a collection of secrets from AWS SSM by path and write them to standard output as a single JSON object.
  put [options] <path>  Read a secrets object from standard input and store it as individual parameters in AWS SSM.
  delete <path>         Delete a collection of secrets from AWS SSM by path and write the response to standard output.

```



## putSecrets
Ingest a `secrets` object and store it as individual parameters in AWS SSM. Returns a promise that resolves to the stored parameters.

```js
const putSecrets = require('secrets-handler').putSecrets

putSecrets({
  secrets: { some: 'secrets' },
  path: '/awesome/project',
  merge: true,
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


#### merge
Type: `boolean`  
Default: `false`  

Merge new secrets over old. Existing parameters are overwritten only if present in the new set of secrets.


#### overwrite
Type: `boolean`  
Default: `false`  

Completely replace the old secrets object with the new one.


#### keyId
Type: `string`  
Default: Your AWS account's default key.  

Specify a KMS key to use when encrypting parameters.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your aws credentials or region.  



## getSecrets
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



## deleteSecrets
Delete all parameters in AWS SSM at a path.
```js
const deleteSecrets = require('secrets-handler').deleteSecrets

deleteSecrets({
  path: '/awesome/project',
  awsConfig: { region: 'us-east-1' }
})
.then(awsResponse => {})
```

### Options


#### path
Type: `string`  

Specify the path prefix of the parameters to delete.


#### awsConfig
Type: `object`  

An [AWS configuration object](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html).  It might, for example, include your AWS credentials or region.  
