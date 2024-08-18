const router = require ('express').Router();
const Tweet = require ('../models/Tweet');
const auth = require ('../middlewares/auth');

//Create a tweet POST
router.post('/', auth, async (req, res) => {
    try {
        const newTweet = new Tweet ({
            user: req.user.id,
            content: req.body.content
        });

        const savedTweet = await newTweet.save();
        res.status(201).json(savedTweet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get all tweets GET
router.get('/', async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ createdAt: -1 }).populate('user', 'username');
        res.json(tweets);
    } catch (res) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;