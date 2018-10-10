const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const app = new (require('express'))();

const port = 3333;

const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath});
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);
  res.send(htmlBuffer.toString());
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

