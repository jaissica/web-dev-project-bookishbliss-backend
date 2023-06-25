import User from "../model/user.js";

const register = async (req, res) => {
  const user = req.body;
  const checkUser = await User.findOne({username: user.username});
  if (checkUser) {
    res.sendStatus(403);
    return;
  }

  await User.create(user);
  res.sendStatus(200);
};

const login = async (req, res) => {
  const info = req.body;
  const user = await User.findOne(
      {username: info.username, password: info.password}, {password: false});

  if (!user) {
    res.sendStatus(403);
    return;
  }
  req.session['user'] = user;
  res.json(user);
}

const logout = async (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
}

const profileById = async (req, res) => {
  const uid = req.params['uid'];
  const user = await User.findById(uid,
      {password: false, email: false, dob: false});
  res.json(user);
}

const editProfile = async (req, res) => {
  const uid = req.params['uid'];
  const userInfo = req.body;

  if (!req.session || !req.session['user'] || uid !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }
  const user = await User.findByIdAndUpdate(uid, {$set: userInfo}, {new: true});
  res.json(user);
}

export default (app) => {
  app.post('/register', register);
  app.post('/login', login);
  app.post('/logout', logout);

  app.get('/user/profile/:uid', profileById);
  app.put('/user/updateProfile/:uid', editProfile);
}