# node-spc-storm-reports

> This is a library that parses and returns NWS Storm Prediction Center [storm reports](http://www.spc.noaa.gov/climo/online/).

## Install

```
$ npm install node-spc-storm-reports
```


## Usage

```js
var nodeStormReports = require('node-spc-storm-reports');

// Only request tornado reports
nodeStormReports('2016-01-01', { hail: false, windDamage: false }).then(function spcResponse(data) {
	console.log(data);
}).catch(function errorHandler(err) {
	console.log(err);
});
```


## API

### nodeStormReports(date, [options])

### date
- Type: `string`

- String in date format `YYYY-MM-DD`, e.g. 2016-01-30

### options (optional)

- Type: `object`

- Defines which weather products should be returned.  NOTE: If no data is available for a given product, the returned value will be an empty array.

- Properties:
	- `tornado`
		* Type: `boolean`
		* Default: `true`
		* Defines whether tornado reports should be returned
	- `hail`
		* Type: `boolean`
		* Default: `true`
		* Defines whether hail reports should be returned
	- `windDamage`
		* Type: `boolean`
		* Default: `true`
		* Defines whether wind damage reports should be returned
	- `gust`
		* Type: `boolean`
		* Default: `false`
		* Defines whether wind gust reports should be returned
	- `blizzard`
		* Type: `boolean`
		* Default: `false`
		* Defines whether blizzard reports should be returned
	- `freezingRain`
		* Type: `boolean`
		* Default: `false`
		* Defines whether freezing rain reports should be returned
	- `heavySnow`
		* Type: `boolean`
		* Default: `false`
		* Defines whether heavy snow reports should be returned
	- `iceStorm`
		* Type: `boolean`
		* Default: `false`
		* Defines whether ice storm reports should be returned
	- `sleet`
		* Type: `boolean`
		* Default: `false`
		* Defines whether sleet reports should be returned
	- `snow`
		* Type: `boolean`
		* Default: `false`
		* Defines whether snow reports should be returned
	- `wildfire`
		* Type: `boolean`
		* Default: `false`
		* Defines whether wildfire reports should be returned


## License

[ISC](https://github.com/jcharrell/node-spc-storm-reports/blob/master/LICENSE) © [Chris Harrell](https://github.com/jcharrell)