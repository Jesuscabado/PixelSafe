import gameModel from "../../models/gameModel.js";

const getAll = async () => {
    try {
        const games = await gameModel.find();
        return games;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getById = async (id) => {
    try {
        const game = await gameModel.findById(id);
        return game;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const create = async (data) => {
    try {
        let game = await gameModel.findOne({ title: data.title });
        if (!game) {
            game = await gameModel.create(data);
        }
        return game;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const update = async (id, data) => {
    try {
        const game = await gameModel.findByIdAndUpdate(id, data, { new: true });
        return game;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const remove = async (id) => {
    try {
        const game = await gameModel.findByIdAndDelete(id);
        return game;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default functions;
