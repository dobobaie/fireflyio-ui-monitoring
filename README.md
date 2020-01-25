# [BETA] fireflyio-ui-monitoring

Fireflyio ui-monitoring is a fireflyio module to visualize the [fireflyio-monitoring](https://github.com/dobobaie/fireflyio-monitoring) activities in real time.  

## /!\ Required

[fireflyio-monitoring](https://github.com/dobobaie/fireflyio-monitoring) is required to use this plugin.  

## 🚀 Fireflyio

[Fireflyio server](https://github.com/dobobaie/fireflyio)  
[Fireflyio client](https://github.com/dobobaie/fireflyio-client)  
[Fireflyio module monitoring](https://github.com/dobobaie/fireflyio-monitoring)  
[Fireflyio module ui-monitoring](https://github.com/dobobaie/fireflyio-ui-monitoring)  

## ☁️ Installation

```
$ unavaible
```

## 💻 Add the module to `fireflyio`

```js
const Fireflyio = require('fireflyio');
const FireflyioMonitoring = require('fireflyio-monitoring');
const FireflyioUiMonitoring = require('fireflyio-ui-monitoring');

const app = new Fireflyio();

app.extend(FireflyioMonitoring);
app.extend(FireflyioUiMonitoring, {
  listenTo: 6633, // required
  accessToken: 'abc132' // optional
});

// ...
```

## ⚙️ Options 

`const app = new Fireflyio(options: object);`   

Name parameter | Type | Default | Description
--- | --- | --- | ---
debug | `boolean` | `false` | Enable debug mode
route | `string` | `/ui-monitoring` | Access route for the UI
accessToken | `string` | `empty` | The `?access_token=` will be required to access to the UI page

## 👥 Contributing

Please help us to improve the project by contributing :)  

## ❓️ Testing

```
$ npm install
$ npm test
```
