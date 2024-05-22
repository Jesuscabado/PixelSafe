import userGameController from "./userGameController.js";

const getAll = async (req, res) => {
    const userGames = await userGameController.getAll();
    res.json({ 
        message: "Here are the user-game relationships",
        data: userGames,
        imageUrl: "https://example.com/your-image.jpg" // Añade la URL de la imagen aquí
    });
}

const getById = async (req, res) => {
    const id = req.params.id;
    const userGame = await userGameController.getById(id);
    if (userGame) {
        res.json({ data: userGame });
    } else {
        res.status(404).json({ message: "User-Game relationship not found" });
    }
}

const create = async (req, res) => {
    const userGame = await userGameController.create(req.body);
    if (userGame) {
        res.status(201).json({ data: userGame });
    } else {
        res.status(400).json({ message: "Error creating user-game relationship" });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const userGame = await userGameController.update(id, req.body);
    if (userGame) {
        res.json({ data: userGame });
    } else {
        res.status(400).json({ message: "Error updating user-game relationship" });
    }
}

const remove = async (req, res) => {
    const id = req.params.id;
    const userGame = await userGameController.remove(id);
    if (userGame) {
        res.json({ data: userGame });
    } else {
        res.status(400).json({ message: "Error deleting user-game relationship" });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
}
