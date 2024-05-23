import connectDB from "../../config/mongo.js";
import mongoose from "mongoose";

import userController from "../../controllers/userController.js";

describe("User Controller Tests", () => {
    beforeAll(async () => {
        await connectDB();
        try {
            await mongoose.connection.collections["users"].drop();
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Create User", async () => {
        const userData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            role: "user"
        };

        const user = await userController.create(userData);

        expect(user).toEqual(expect.objectContaining(userData));
    });

    test("Get User by ID", async () => {
        const userData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            role: "user"
        };

        const newUser = await userController.create(userData);

        const foundUser = await userController.getById(newUser._id);

        expect(foundUser).toMatchObject(newUser);
    });

    test("Delete User by ID", async () => {
        const userData = {
            email: "test@example.com",
            username: "testuser",
            password: "testpassword",
            role: "user"
        };

        const newUser = await userController.create(userData);

        const deletedUser = await userController.remove(newUser._id);

        expect(deletedUser).toMatchObject(newUser);
    });
});
