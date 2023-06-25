import User from "./model/user.js"

export const authUser = async (req, res, next) => {
  if (req.session && req.session['user'] && req.session['user']._id) {
    const user = await User.findById(req.session['user']._id);
    if (user)
      return next();
  }

  return res.sendStatus(403);
}