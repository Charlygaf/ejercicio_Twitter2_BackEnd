async function index(req, res) {
  res.render("portal");
}

async function error404(req, res) {
  res.render("error404");
}

module.exports = {
  index,
  error404,
};
