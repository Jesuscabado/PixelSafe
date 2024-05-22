import userModel from "../../models/userModel.js";
import userGameModel from "../../models/userGameModel.js";
import mongoose from "mongoose";

const getAll = async () => {
    try {
        const users = await userModel.find().populate('gamesList');
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async (id) => {
    try {
        const user = await userModel.findById(id).populate('gamesList');
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getByProperty = async (property, value) => {
    try {
        const user = await userModel.find({ [property]: value }).populate('gamesList');
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const create = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = new userModel(data);
        const savedUser = await user.save({ session });

        const userGames = new userGameModel({ userId: savedUser._id });
        const savedUserGames = await userGames.save({ session });

        savedUser.gamesList = savedUserGames._id;
        await savedUser.save({ session });

        await session.commitTransaction();
        session.endSession();

        return savedUser;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, data, { new: true }).populate('gamesList');
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async (id) => {
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (user && user.gamesList) {
            await userGameModel.findByIdAndDelete(user.gamesList);
        }
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}

export default functions;
