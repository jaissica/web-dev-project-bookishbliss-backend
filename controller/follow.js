import Follow from "../model/follow.js";

const follow = async (req, res) => {
  const info = req.body;
  if (!req.session || !req.session['user'] || info.follower
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }
  const result = await Follow.create(info);
  res.json(result);
}

const unfollow = async (req, res) => {
  const fid = req.params.fid;
  const info = await Follow.deleteOne({_id: fid});
  res.json(info);
}

const getFollowerCount = async (req, res) => {
  const uid = req.params.uid;
  const result = await Follow.find({followee: uid});
  res.json(result.length);
}

const getFolloweeCount = async (req, res) => {
  const uid = req.params.uid;
  const result = await Follow.find({follower: uid});
  res.json(result.length);
}

const findFollow = async (req, res) => {
  const uid = req.params.uid;
  const curid = req.params.curid;
  if (!req.session || !req.session['user'] || curid
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }
  const find = await Follow.find({follower: curid, followee: uid});
  res.json(find);
}

const getFolloweeList = async (req, res) => {
  const uid = req.params.uid;
  if (!req.session || !req.session['user'] || uid !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const list = await Follow.find({follower: uid}, {follower: false})
  .populate('followee', "_id username fullname")
  .exec();
  res.json(list);
}

const getFollowerList = async (req, res) => {
  const uid = req.params.uid;
  if (!req.session || !req.session['user'] || uid !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const list = await Follow.find({followee: uid}, {followee: false})
  .populate('follower', "_id username fullname")
  .exec();
  res.json(list);
}

export default (app) => {
  app.post('/follow/follow', follow);
  app.delete('/follow/unfollow/:fid', unfollow);

  app.get('/follow/followerCount/:uid', getFollowerCount);
  app.get('/follow/followeeCount/:uid', getFolloweeCount);
  app.get('/follow/findFollow/:uid/:curid', findFollow);

  app.get('/follow/followeeList/:uid', getFolloweeList);
  app.get('/follow/followerList/:uid', getFollowerList);
}