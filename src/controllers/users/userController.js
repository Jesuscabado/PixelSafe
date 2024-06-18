import userModel from "../../models/userModel.js";
import userGameModel from "../../models/userGameModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userRows = { _id: 1, username: 1, email: 1, role: 1, projects: 1 };

// Función para obtener todos los usuarios con la lista de juegos
const getAll = async (query = null) => {
    try {
        const filter = {};
        if (query) {
            filter.$or = [
                { username: { $regex: ".*" + query + ".*", $options: "i" } },
                { email: { $regex: ".*" + query + ".*", $options: "i" } }
            ];
        }
        const users = await userModel.find(filter, userRows).populate('gamesList');
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Función para obtener un usuario por ID con la lista de juegos
const getById = async (id) => {
    try {
        const user = await userModel.findById(id, userRows).populate('gamesList');
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Función para obtener un usuario por una propiedad específica
const getByProperty = async (property, value, isAdmin = false) => {
    try {
        const filter = { [property]: value };
        if (!isAdmin) {
            filter.role = "user";  // Por ejemplo, puedes filtrar solo usuarios normales si no es administrador
        }
        const users = await userModel.find(filter, userRows).populate('gamesList');
        return users;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Función para manejar el login de usuarios
const login = async (data) => {
    const { email, username, password } = data;
    if ((!email && !username) || !password) {
        return { error: "Email or username and password are required" };
    }
    try {
        let user;
        if (email) {
            const users = await getByProperty("email", email, true);
            user = users[0];
        } else {
            const users = await getByProperty("username", username, true);
            user = users[0];
        }
        if (!user) {
            return { error: "User not found", status: 404 };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Invalid email or password", status: 401 };
        }
        const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        return { token };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred", status: 500 };
    }
};

// Función para registrar un nuevo usuario
const register = async (data) => {
    const { email, username, password, passwordRepeat } = data;
    if (!email || !username || !password || !passwordRepeat) {
        return { error: "All fields are required" };
    }
    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }
    const userData = {
        email,
        username,
        password,
        role: "user"
    };
    const user = await create(userData);
    return user;
};

// Función para crear un nuevo usuario y su lista de juegos
const create = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
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
};

// Función para actualizar un usuario
const update = async (id, data) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, data, { new: true }).populate('gamesList');
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Función para eliminar un usuario
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
};

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    login,
    register,
    update,
    remove
};

export default functions;
