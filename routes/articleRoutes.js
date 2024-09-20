import Express from 'express';
import articleModel from '../model/articleModel.js';

const router = Express.Router();

router.get('/getallarticles', async (req, res) => {
    try {
        const articles = await articleModel.find({});
        res.status(200).send(articles);
        // console.log(articles);
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

export default router;
