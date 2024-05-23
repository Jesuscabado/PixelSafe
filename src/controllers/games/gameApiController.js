import gameController from "../../controllers/games/gameController.js";

const getAll = async (req, res) => {
    try {
        const games = await gameController.getAll();
        res.json({ data: games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await gameController.getById(id);
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const create = async (req, res) => {
    try {
        const game = await gameController.create(req.body);
        if (game) {
            res.status(201).json({ data: game });
        } else {
            res.status(400).json({ message: "Error creating game" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating game" });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const game = await gameController.update(id, data);
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating game" });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await gameController.remove(id);
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deleting game" });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
