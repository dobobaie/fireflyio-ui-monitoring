const Fireflyio = require('../../fireflyio/lib');
const FireflyioMonitoring = require('../../fireflyio-monitoring/lib');
const FireflyioUiMonitoring = require('../lib');

const app = new Fireflyio({ debug: true });
app.extend(FireflyioMonitoring, {
  debug: true,
  isLocal: true
});
app.extend(FireflyioUiMonitoring, {
  debug: true,
  accessToken: 'abc132'
});

app.use(ctx => {
  ctx.body = 'Hello Fireflyio';
});

app.listen(4000);
