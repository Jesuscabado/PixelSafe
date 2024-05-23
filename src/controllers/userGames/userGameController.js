import userGameModel from "../../models/userGameModel.js";

const getAll = async () => {
    try {
        const userGames = await userGameModel.find().populate('userId').populate('ownedGames.gameId').populate('pendingGames.gameId');
        return userGames;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async (id) => {
    try {
        const userGame = await userGameModel.findById(id).populate('userId').populate('ownedGames.gameId').populate('pendingGames.gameId');
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const create = async (data) => {
    try {
        const userGame = await userGameModel.create(data);
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        const userGame = await userGameModel.findByIdAndUpdate(id, data, { new: true }).populate('userId').populate('ownedGames.gameId').populate('pendingGames.gameId');
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async (id) => {
    try {
        const userGame = await userGameModel.findByIdAndDelete(id).populate('userId').populate('ownedGames.gameId').populate('pendingGames.gameId');
        return userGame;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
}
