# param-handler

> Store and retrieve parameters securely via AWS SSM.


### putSecrets.sh
Ingest a local JSON file and store it as individual parameters in AWS SSM.
```
putSecrets.sh [--path | -p <value>] [--overwrite | -o] [--quiet | -q] <filename>
```

#### Options
`--path` or `-p`  
Specify a path to be used as part of the parameter names. If none is provided a UUID will be used to prevent parameter name collision.

`--overwrite` or `-o`  
Flag indicating that existing parameters should be overwritten.

`--quiet` or `-q`  
Quiet down and log fewer things.

`<filename>`  
Specifies a JSON file from which to read the secrets.  Defaults to `secrets.json`.


#### Example
```
putSecrets.sh --path /awesome/project secrets.json
```

### getSecrets.sh
Fetch a collection of secrets from AWS SSM by path and write them to standard output as a single JSON object.
```
getSecrets.sh [--path | -p <value>]
```

#### Options
`--path` or `-p`  
Specify a path to be used as a prefix for fetched parameters. Defaults to `/`.

#### Example
```
getSecrets.sh --path /awesome/project
```
