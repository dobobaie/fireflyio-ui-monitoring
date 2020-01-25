const fs = require('fs');

const { Debug } = require('./utils');

const defaultOptions = {
  debug: false,
  route: '/ui-monitoring',
  accessToken: ''
};

module.exports = class $fireflyioUiMonitoring
{
  constructor(fireflyio, custom_options) {
    this.name = 'io-monitoring';
    this.path_template = __dirname + '/../template/ui-monitoring.html';
    this.options = Object.assign({}, defaultOptions, custom_options);
    this.debug = Debug(this.options).debug;
    this.fireflyio = fireflyio;

    if (!this.fireflyio.modules.monitoring) {
      this.debug('[DEBUG]', `FIREFLYIO-UI-MONITORING: "fireflyio-monitoring" module is required`);
      return ;
    }

    this.monitoring = this.fireflyio.modules.monitoring;
    this._initializeHttpRoute();
  }

  _renderTemplateRoute(ctx) {
    if (
      this.options.accessToken
      && ctx.queries.access_token !== this.options.accessToken) {
      ctx.status = 403;
      ctx.body = {
        error: 'Unauthorized access'
      };
      return ;
    }
    
    let template = fs.readFileSync(this.path_template).toString();
    template = template.replace(
      'ENV.FIREFLYIO_UI_MONITORING',
      JSON.stringify({
        prefix_ui_monitoring: this.options.route,
        access_token: this.options.accessToken
      })
    );

    ctx.headers['Content-Type'] = 'text/html';
    ctx.body = template;
  };

  _renderJSONRoute(ctx) {
    if (
      this.options.accessToken
      && ctx.queries.access_token !== this.options.accessToken) {
      ctx.status = 403;
      ctx.body = {
        error: 'Unauthorized access'
      };
      return ;
    }

    const total_servers = this.monitoring.modules.server.getNumberServers();
    const servers_list = this.monitoring.modules.server.retrieveServersList()
      .map(server => ({
        url: server.url,
        total_clients: server.server.getNumberClients()
      }));
   
    ctx.headers['Content-Type'] = 'application/json';
    ctx.body = {
      servers_list,
      total_servers,
      max_number_servers: this.monitoring.options.maxNumberServers,
      max_number_users_per_server: this.monitoring.options.maxNumberUsersPerServer,
    };
  };

  _initializeHttpRoute()
  {
    this.fireflyio.options.whiteListHttpRequests.push(this.options.route);
    this.fireflyio.options.whiteListHttpRequests.push(this.options.route + '/json');
    this.fireflyio.get(this.options.route, ctx => this._renderTemplateRoute(ctx));
    this.fireflyio.get(this.options.route + '/json', ctx => this._renderJSONRoute(ctx));
  }
};
