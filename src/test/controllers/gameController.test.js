import connectDB from "../../config/mongo.js";
import mongoose from "mongoose";
import gameController from "../../controllers/games/gameController.js";

describe("test de gameController", () => {
    const gameData = {
        title: "test",
        genre: "test-genre",
        platforms: ["test-platform"]
    };

    beforeAll(async () => {
        await connectDB();
        try {
            await mongoose.connection.collections["games"].drop();
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Crear juego", async () => {
        const game = await gameController.create(gameData);
        expect(game).toEqual(expect.objectContaining(gameData));
    });

    test("Obtener juego por id", async () => {
        const createdGame = await gameController.create(gameData);
        const gameById = await gameController.getById(createdGame._id);
        expect(gameById).toEqual(expect.objectContaining(gameData));
    });

    test("Eliminar juego por id", async () => {
        const createdGame = await gameController.create(gameData);
        const removedGame = await gameController.remove(createdGame._id);
        expect(removedGame).toEqual(expect.objectContaining(gameData));
    });
});
