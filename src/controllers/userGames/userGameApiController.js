import userGameController from "../../controllers/userGames/userGameController.js";

const getAll = async (req, res) => {
    try {
        const userGames = await userGameController.getAll();
        res.json({
            message: "Here are the user-game relationships",
            data: userGames,
            imageUrl: "https://example.com/your-image.jpg" // Añade la URL de la imagen aquí
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const userGame = await userGameController.getById(id);
        if (userGame) {
            res.json({ data: userGame });
        } else {
            res.status(404).json({ message: "User-Game relationship not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const create = async (req, res) => {
    try {
        const userGame = await userGameController.create(req.body);
        if (userGame) {
            res.status(201).json({ data: userGame });
        } else {
            res.status(400).json({ message: "Error creating user-game relationship" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating user-game relationship" });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userGame = await userGameController.update(id, req.body);
        if (userGame) {
            res.json({ data: userGame });
        } else {
            res.status(400).json({ message: "Error updating user-game relationship" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating user-game relationship" });
    }
};

const remove = async (req, res) => {
    try {
        const { id, gameId, listType } = req.params;
        const userGame = await userGameController.remove(id, gameId, listType);
        if (userGame) {
            res.json({ data: userGame });
        } else {
            res.status(400).json({ message: "Error deleting user-game relationship" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deleting user-game relationship" });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
