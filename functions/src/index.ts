import * as functions from 'firebase-functions';
import * as path from 'path';
import * as request from 'request';
import * as ejs from 'ejs';
import compression = require('compression');
import express = require('express');

const app = express();

// Define the views directory (for the Server Side Rendering)
app.set('views', path.join(__dirname, '../views'));
// Set the view engine for the Server Side Rendering
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Define the location of the public folder for the static assets
app.use(express.static(path.join(__dirname, '../../public')));

// Set headers for all requests
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// Use gzip to compress the assets
app.use(compression());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/code', (req, res) => {
  res.render('code');
});

app.get('/samples', (req, res) => {
  return request({
    url: 'https://diegocoy-93a57.firebaseio.com/samples.json',
    method: 'GET'
  }, (err: Error, response: request.Response) => {
    if(err) {
      console.error(err);
    }else {
      res.render('code-samples', {samplesArr: JSON.parse(String(response.body))});
    }
  });
});

app.get('/experiments', (req, res) => {
  return request({
    url: 'https://diegocoy-93a57.firebaseio.com/experiments.json',
    method: 'GET'
  }, (err: Error, response: request.Response) => {
    if(err) {
      console.error(err);
    }else {
      res.render('code-experiments', {experimentsArr: JSON.parse(String(response.body))});
    }
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/api/talks', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  return request({url: 'https://diegocoy-93a57.firebaseio.com/talks.json', method: 'GET'}).pipe(res);
});

export const main = functions.https.onRequest(app);