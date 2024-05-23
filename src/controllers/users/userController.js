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

const login = async (data) => {
    const {email, username, password} = data;
    if((!email && !username) || !password){
        return {error: "Email or username and password are required"};
    }
    try {
        let user;
        if(email){
            const users = await getByProperty("email", email);
            user = users[0];
        }
        else{
            const users = await getByProperty("username", username);
            user = users[0];
        }
        console.log("usuario", user);
        if(!user){
            return {error: "User not found", status: 404};
        }
        console.log("contraseña", password,user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return {error: "Combinacion de email y contraseña incorrecta", status: 401};
        }
        console.log("login correcto",user);
        const token = jwt.sign({_id:user._id,username:user.username,role:user.role},process.env.JWT_SECRET,{expiresIn: 60 * 60})
        return {token};

    } catch (error) {
        console.error(error);
        return {error:"Ha habido un error",status:500};
    }
}

const register = async(data) => {
    const {email,username,password,passwordRepeat} = data;
    if(!email || !username || !password || !passwordRepeat){
        return {error:"Falta alguno de los campos"};
    }
    if(password !== passwordRepeat){
        return {error:"Las contraseñas no coinciden"};
    }
    const userData = {
        email,
        username,
        password,
        role:"user"
    }
    const user = await create(userData);
    return user;
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
    login,
    register,
    update,
    remove
}

export default functions;
