import gameModel from "../../models/gameModel.js";

const getAll = async (req, res) => {
    try {
        const games = await gameModel.find();
        res.json({ data: games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await gameModel.findById(id);
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const create = async (req, res) => {
    try {
        const game = await gameModel.create(req.body);
        res.status(201).json({ data: game });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating game" });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const game = await gameModel.findByIdAndUpdate(id, data, { new: true });
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating game" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const game = await gameModel.findByIdAndDelete(id);
        if (game) {
            res.json({ data: game });
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deleting game" });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
}
