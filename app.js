

let MONGO_URL = process.env.BOOK_DB_CONNECTION_STRING || 'mongodb://localhost:27017/book';

mongoose.connect(MONGO_URL)

const app = express();

app.use(cors({
  credentials: true,
  origin: [process.env.BOOK_FRONTEND, 'http://localhost:3000']
}))

app.use(session({
  secret: process.env.BOOK_SESSION_SECRET || "1234567899",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}))
app.use(express.json());

app.get('', (req, res) => {
  res.send("Hello World!");
})

UserController(app);
BookListController(app);
FollowController(app);
LikeBookController(app);
LikeListController(app);
ReviewController(app);

app.listen(process.env.PORT || 4000);

