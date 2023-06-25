import Review from "../model/review.js";

const createReview = async (req, res) => {
  const review = req.body;
  if (!review || review.user !== req.session['user']._id) {
    res.sendStatus(403);
    return;
  }

  const result = await Review.create(review);
  const newReview = await Review.find({_id: result._id}).populate('user',
      "_id username fullname").exec();
  res.json(newReview);
}

const getReviewsByBook = async (req, res) => {
  const book = req.params['isbn'];
  const reviews = await Review.find({book}).sort({createdAt: -1}).populate(
      'user', "_id username fullname").exec();
  res.json(reviews);
}



export default (app) => {
  app.post('/review/createReview', createReview);
  app.get('/review/getReviewsByBook/:isbn', getReviewsByBook);
  app.delete('/review/deleteReview/:rid', deleteReview);
}