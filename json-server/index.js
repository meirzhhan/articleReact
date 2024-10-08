const fs = require('fs');
const jsonServer = require('json-server');
// const cors = require('cors');
const path = require('path');

const server = jsonServer.create();

// server.use(cors());

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Задержка для имитации Backend-а
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// Endpoint для логина
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
    );
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    // console.log(e); derscanner fix
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
