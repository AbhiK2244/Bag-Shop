import express from "express";

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    res.send("insider owner's router")
})

export default router;