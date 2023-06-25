import Likebook from "../model/likebook.js";

const likeBook = async (req, res) => {
  const info = req.body;
  if (!info || !req.session['user'] || info.user !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await Likebook.create(info);
  res.json(result);
}

const unlikeBook = async (req, res) => {
  const id = req.params['lbid'];
  const findLike = await Likebook.findById(id);
  if (!findLike || !req.session['user'] || findLike.user.toString() !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }
  const status = await Likebook.deleteOne(findLike);
  res.json(status);
}

const getLikeBooksByUser = async (req, res) => {
  const uid = req.params.uid;
  const lists = await Likebook.find({user: uid}).sort({createdAt: -1});
  res.json(lists);
}



export default (app) => {
  app.post('/likebook/like', likeBook);
  app.delete('/likebook/unlike/:lbid', unlikeBook);
  app.get('/likebook/user/:uid/book/:isbn', getUserLikeBook);

  app.get('/likebook/getLikeBooksByUser/:uid', getLikeBooksByUser);
}