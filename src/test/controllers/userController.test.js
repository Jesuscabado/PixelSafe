import connectDB from "../../config/mongo.js";
import mongoose from "mongoose";
import userController from "../../controllers/users/userController.js";

describe("test de userController", () => {
    let userId;

    beforeAll(async () => {
        await connectDB();
        try {
            await mongoose.connection.collections["users"].drop();
        } catch (error) {
            // Es posible que la colección no exista, lo cual es aceptable en este punto.
            console.log(error);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Crear usuario", async () => {
        const user = await userController.create({
            email: "test",
            username: "test",
            password: "test",
            role: "user",
            gamesList: "test"
        });
        userId = user._id;
        expect(user).toEqual(expect.objectContaining({
            email: "test",
            username: "test",
            password: "test",
            role: "user",
            gamesList: "test"
        }));
    });

    test("Obtener usuario por id", async () => {
        const user = await userController.getById(userId);
        expect(user).toEqual(expect.objectContaining({
            email: "test",
            username: "test",
            password: "test"
        }));
    });

    test("Obtener usuario por email", async () => {
        const users = await userController.getByProperty("email", "test");
        expect(users[0]).toEqual(expect.objectContaining({
            email: "test",
            username: "test",
            password: "test"
        }));
    });

    test("Obtener usuario por username", async () => {
        const users = await userController.getByProperty("username", "test");
        expect(users[0]).toEqual(expect.objectContaining({
            email: "test",
            username: "test",
            password: "test"
        }));
    });

    test("Eliminar usuario", async () => {
        const user = await userController.remove(userId);
        expect(user).toEqual(expect.objectContaining({
            email: "test",
            username: "test",
            password: "test"
        }));

        // Verificar que el usuario ha sido eliminado
        const deletedUser = await userController.getById(userId);
        expect(deletedUser).toBeNull();
    });
});
