module.exports.defaultGet = (req, res) => {
  res.status(200).send({
    data: `Доступные ресурсы:
  \\signup - регистрация
  \\signin - залогиниться
  \\signout - разлогиниться
  \\users\\me - доступ к своей учетной записи
  \\movies - фильмы`,
  });
};
