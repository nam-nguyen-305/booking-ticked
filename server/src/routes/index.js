const newsRouter = require('./news');
const meRouter = require('./me');
const movieRouter = require('./movie');
const employeeRouter = require('./employee');
const foodRouter = require('./food');
const userRouter = require('./adminToUser');
const roomRouter = require('./room');
const showRouter = require('./showtime');
const userPrivateRouter = require('./user');
const bookingRouter = require('./booking');
const siteRouter = require('./site');
const authRouter = require('./auth');
const adminToUser = require('./adminToUser');
const { auth, checkUser } = require('../util/auth');

function route(app) {
  app.get('*', checkUser);
  app.use('/news', newsRouter);
  app.use('/admin', meRouter);
  app.use('/movies', movieRouter);
  app.use('/user', userPrivateRouter);
  app.use('/employees', employeeRouter);
  app.use('/food', foodRouter);
  app.use('/users', userRouter);
  app.use('/rooms', roomRouter);
  app.use('/showtimes', showRouter);
  app.use('/booking', bookingRouter);
  app.use('/admin', adminToUser);
  app.use('/', siteRouter);
  app.use(authRouter);
}

module.exports = route;
