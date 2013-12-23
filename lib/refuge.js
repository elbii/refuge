/*
 * All HTML requests are handled by nginx before reaching Node. This is
 * insanely fast and allows Node to simply be a JSON handler.
 */
var cookieSecret = 'CHANGE ME';

var express = require('express')
  , routes = require('./routes')
  , authenticator = require('./routes/authenticator')
  , respondWith = require('./routes/respondWith')
  , sessions = require('./routes/sessions')
  , params = require('./routes/params')
  , permissions = require('./routes/permissions')
  , users = require('./routes/users')
  , goods = require('./routes/goods')
  , http = require('http')
  , path = require('path')
  , RedisStore = require('connect-redis')(express);

var app = express();

// All envs
app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession({
    secret: process.env.COOKIE_SECRET || cookieSecret,
    store: new RedisStore(),
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000} // 30-day sessions
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Development env
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Test env
app.configure('test', function(){
  app.use(express.errorHandler());
});

/*
 * ROUTES
 */
app.get('/', routes.index);
app.get('/account', routes.index);

/*
 * User routes
 */
app.post('/users',
  users.create);

app.del('/users',
  [ respondWith.html, authenticator.checkSession ],
  users.destroy);

app.patch('/users',
  [ respondWith.html, authenticator.checkSession ],
  users.update);

// Load currently signed in user
app.get('/user',
  [ respondWith.html, authenticator.checkSession ],
  users.show);

/*
 * Goods
 */
app.get('/goods/:id',
  [ respondWith.html, authenticator.checkSession ],
  goods.show);

app.get('/goods',
  [ respondWith.html, authenticator.checkSession ],
  goods.index);

app.post('/goods',
  [ respondWith.html, authenticator.checkSession, permissions.enforce,
    params.sanitize ],
  goods.create);

app.put('/goods/:id',
  [ respondWith.html, authenticator.checkSession, permissions.enforce,
    params.sanitize ],
  goods.update);

app.patch('/goods/:id',
  [ respondWith.html, authenticator.checkSession, permissions.enforce,
    params.sanitize ],
  goods.update);

app.del('/goods/:id',
  [ respondWith.html, authenticator.checkSession ],
  goods.destroy);

/*
 * Authentication
 */

// Load currently signed in session
app.get('/session', [ authenticator.checkSession ],
  sessions.show);

app.post('/sessions',
  sessions.create);

// Delete a session. Allows user to delete session for a different device than
// the one currently logged in.
app.del('/sessions/:id',
  sessions.destroy);


// Start server
http.createServer(app).listen(app.get('port'), function(){
});

exports.app = app;
