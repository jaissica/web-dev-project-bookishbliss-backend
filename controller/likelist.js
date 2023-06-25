import Likelist from "../model/likelist.js";

const likeList = async (req, res) => {
  const info = req.body;
  if (!info || !req.session['user'] || info.user !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await Likelist.create(info);
  res.json(result);
}

const unlikeList = async (req, res) => {
  const id = req.params['llid'];
  const findLike = await Likelist.findById(id);
  if (!findLike || !req.session['user'] || findLike.user.toString()
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }
  const status = await Likelist.deleteOne(findLike);
  res.json(status);
}

const getUserLikeList = async (req, res) => {
  const user = req.params['uid'];
  const bookList = req.params['lid'];
  const like = await Likelist.find({user, bookList});
  res.json(like);
}

const getLikeListByUser = async (req, res) => {
  const uid = req.params.uid;
  const lists = await Likelist.find({user: uid}).sort({createdAt: -1}).populate(
      'bookList', 'title').exec();

  res.json(lists);
}

export default (app) => {
  app.post('/likelist/like', likeList);
  app.delete('/likelist/unlike/:llid', unlikeList);
  app.get('/likelist/user/:uid/list/:lid', getUserLikeList);
  app.get('/likelist/getLikeListsByUser/:uid', getLikeListByUser);
}