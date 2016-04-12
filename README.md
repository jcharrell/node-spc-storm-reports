# node-storm-reports

>

## Install

```
$ npm install --save node-storm-reports
```


## Usage

```js
const nodeStormReports = require('node-storm-reports');
```


## API

### nodeStormReports(date, [options])

#### date
Type: `string`<br>

String in date format `YYYY-MM-DD`, e.g. 2016-01-30

#### options

##### tornado

Type: `boolean`<br>
Default: `true`

Defines whether tornado reports should be returned.

##### wind

Type: `boolean`<br>
Default: `true`

Defines whether wind reports should be returned.

##### hail

Type: `boolean`<br>
Default: `true`

Defines whether hail reports should be returned.


## License

MIT © Chris Harrell(https://github.com/jcharrell)