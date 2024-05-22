import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platforms: {
        type: [String],
        required: true
    }
});

const gameModel = mongoose.model("game", gameSchema);

export default gameModel;
