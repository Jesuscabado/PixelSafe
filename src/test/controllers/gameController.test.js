import connectDB from "../../config/mongo.js";
import mongoose from "mongoose";

import gameController from "../../controllers/games/gameController.js";


describe("test de gameController", () => {
    beforeAll(async () => {
        await connectDB();
        try{
            await mongoose.connection.collections["games"].drop();
        }catch(error){
            console.log(error);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test ("Crear juego", async () => {
        const game = await gameController.create({
            name: "test",
            platforms: ["test"]
        });
        expect(game).toEqual(expect.objectContaining({
            name: "test",
            platforms: ["test"]
        }));
    });

    test ("Obtener juego por id", async () => {
        const game = await gameController.create({
            name: "test",
            platforms: ["test"]
        });
        const gameById = await gameController.getById(game._id);
        expect(gameById).toEqual(expect.objectContaining({
            name: "test",
            platforms: ["test"]
        }));
    });

    test ("Eliminar juego por id", async () => {
        const game = await gameController.create({
            name: "test",
            platforms: ["test"]
        });
        const gameById = await gameController.remove(game._id);
        expect(gameById).toEqual(expect.objectContaining({
            name: "test",
            platforms: ["test"]
        }));
    });
})