const Score = require('../models/Score');

//Read
const getAllScores = async (req, res) => {
    const scores = await Score.find({});
    res.json({ success: true, data: scores });
};

//Create
const createScore = async (req, res) => {
    const score = new Score(req.body);
    await score.save();
    res.json({ success: true, data: score, message: "Data saved successfully" });
};

//Update a score
const updateScore = async (req, res) => {
    const { _id, ...rest } = req.body;
    await Score.updateOne({ _id: _id }, rest);
    res.json({ success: true, message: "Data updated successfully" });
}

//Delete a score
const deleteScore = async (req, res) => {
    const id = req.params.id;
    await Score.deleteOne({ _id: id });
    res.json({ success: true, message: "Data deleted successfully" });
}

module.exports = {
    getAllScores,
    createScore,
    updateScore,
    deleteScore,
};