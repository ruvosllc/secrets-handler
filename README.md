# param-handler

> Store and retrieve parameters securely via AWS SSM.


### putSecrets.sh
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
