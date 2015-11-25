import express from 'express';
import webpack from 'webpack';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(webpackDevMiddelware(webpack(webpackConfig), {
  publicPath: '/__build__',
  stats: {
    colors: true,
  },
}));

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`);
});
