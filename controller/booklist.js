import BookList from "../model/booklist.js"

// To find books list by user
const findBookListByUser = async (req, res) => {
  const userId = req.params.uid;
  const lists = await BookList.find({creator: userId}).sort({createdAt: -1});
  res.json(lists);
}

// to create books list
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

// to delete books list
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

// to get latest books list
const getLatestBookList = async (req, res) => {
  const lists = await BookList.find({}, {books: false}).sort(
      {createdAt: -1}).limit(4);
  res.json(lists);
}


//add books to a given list
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

// get the stored books list
const getList = async (req, res) => {
  const lid = req.params.lid;
  const list = await BookList.findById(lid).populate('creator', "fullname");
  res.json(list);
}

// delete specifc books in a list
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
  // get: To get user by id
  app.get('/booklist/getBookLists/:uid', findBookListByUser);
 // post: create books list
  app.post('/booklist/createBookList', createBookList);
 // delete: delete books list
  app.delete('/booklist/deleteBookList/:lid', deleteBookList);
// get: to get latest book list
  app.get('/booklist/getLatestBookList', getLatestBookList);
// put: add books to list
  app.put('/booklist/addBookToList/:lid', addBookToList);
// get: get boom list
  app.get('/booklist/getList/:lid', getList);
// delete: delete books in a list
  app.delete('/booklist/delete/:lid/:bid', deleteBookInList);
}