module.exports = function (app) {
  app.get('/react', function (req, res) {
    res.render('reactView');
  });
};
