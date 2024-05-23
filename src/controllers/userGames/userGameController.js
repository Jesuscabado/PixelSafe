import userGameModel from "../../models/userGameModel.js";
import gameModel from "../../models/gameModel.js";

const getAll = async () => {
    try {
        const userGames = await userGameModel.find()
            .populate('userId')
            .populate('ownedGames.gameId')
            .populate('pendingGames.gameId');
        return userGames;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getById = async (id) => {
    try {
        const userGame = await userGameModel.findById(id)
            .populate('userId')
            .populate('ownedGames.gameId')
            .populate('pendingGames.gameId');
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const create = async (data) => {
    try {
        // Check if the game exists in the main database, add if not
        for (let game of data.ownedGames) {
            let existingGame = await gameModel.findById(game.gameId);
            if (!existingGame) {
                await gameModel.create(game);
            }
        }

        for (let game of data.pendingGames) {
            let existingGame = await gameModel.findById(game.gameId);
            if (!existingGame) {
                await gameModel.create(game);
            }
        }

        const userGame = await userGameModel.create(data);
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const update = async (id, data) => {
    try {
        const userGame = await userGameModel.findByIdAndUpdate(id, data, { new: true })
            .populate('userId')
            .populate('ownedGames.gameId')
            .populate('pendingGames.gameId');
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const remove = async (id, gameId, listType) => {
    try {
        const userGame = await userGameModel.findById(id);
        if (!userGame) {
            return null;
        }

        userGame[listType] = userGame[listType].filter(game => game.gameId.toString() !== gameId);
        await userGame.save();

        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
