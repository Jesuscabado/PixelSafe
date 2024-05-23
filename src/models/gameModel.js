import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    platforms: {
        type: [String],
    }
});

const gameModel = mongoose.model("game", gameSchema);

export default gameModel;
