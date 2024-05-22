import mongoose from "mongoose";

const userGameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    ownedGames: [
        {
            gameId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "game",
                required: true
            },
            platform: {
                type: String,
                required: true
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }
    ],
    pendingGames: [
        {
            gameId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "game",
                required: true
            },
            platform: {
                type: String,
                required: true
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const userGameModel = mongoose.model("userGame", userGameSchema);

export default userGameModel;
