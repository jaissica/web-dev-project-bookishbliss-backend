import BookList from "../model/booklist.js"



const createBookList = async (req, res) => {
  const info = req.body;
  if (!info || !req.session['user'] || info.creator
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await BookList.create(info);
  res.json(result);
}

const deleteBookList = async (req, res) => {
  const lid = req.params.lid;
  const list = await BookList.findById(lid);

  if (!list || !req.session['user'] || list.creator.toString()
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await BookList.deleteOne({_id: lid})
  res.json(result)
}

const getLatestBookList = async (req, res) => {
  const lists = await BookList.find({}, {books: false}).sort(
      {createdAt: -1}).limit(4);
  res.json(lists);
}

const addBookToList = async (req, res) => {
  const lid = req.params.lid;
  const list = await BookList.findById(lid);
  if (!list || !req.session['user'] || req.session['user']._id
      !== list.creator.toString()) {
    res.sendStatus(403);
    return;
  }
  const book = req.body;
  const result = await BookList.updateOne({_id: lid}, {$push: {books: book}});
  res.json(result);
}

const getList = async (req, res) => {
  const lid = req.params.lid;
  const list = await BookList.findById(lid).populate('creator', "fullname");
  res.json(list);
}

const deleteBookInList = async (req, res) => {
  const lid = req.params.lid;
  const bid = req.params.bid;

  const list = await BookList.findById(lid);
  if (!list || !req.session['user'] || list.creator.toString()
      !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await BookList.updateOne({_id: lid},
      {$pull: {books: {_id: bid}}});
  res.json(result)
}

export default (app) => {
  app.get('/booklist/getBookLists/:uid', findBookListByUser);

  app.post('/booklist/createBookList', createBookList);

  app.delete('/booklist/deleteBookList/:lid', deleteBookList);

  app.get('/booklist/getLatestBookList', getLatestBookList);

  app.put('/booklist/addBookToList/:lid', addBookToList);

  app.get('/booklist/getList/:lid', getList);

  app.delete('/booklist/delete/:lid/:bid', deleteBookInList);
}