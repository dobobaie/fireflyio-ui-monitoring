const Fireflyio = require('../../fireflyio/lib');
const FireflyioClient = require('../../fireflyio-client/lib');
const FireflyioMonitoring = require('../../fireflyio-monitoring/lib');
const FireflyioUiMonitoring = require('../../fireflyio-ui-monitoring/lib');

(async () => {
  // ---
  const app = new Fireflyio({ debug: true });
 
  app.extend(FireflyioMonitoring, {
    debug: true,
    maxNumberServers: 2,
    maxNumberUsersPerServer: 1,
    isLocal: true
  });

  app.extend(FireflyioUiMonitoring, { debug: true, accessToken: 'test' });

  app
    .get('/hello', ctx => {
      console.log('/hello', ctx);
      ctx.body = {
        message: 'Hello'
      };
    });

  app.listen(2525);
  // ---

  // ---
  // const fireflyioClient = new FireflyioClient('http://localhost:2525/', {
  //   debug: true,
  //   timeout: 5000
  // });
  
  // fireflyioClient.get('/hello').then(response =>
  //   console.log('get /hello response', response)
  // ).catch(err => console.log('error get /hello', err));
  // ---
})();
