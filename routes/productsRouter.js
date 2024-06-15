import express from "express";

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    res.send("inside products router")
})

export default router;