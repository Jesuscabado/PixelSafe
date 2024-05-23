import mongoose from "mongoose";
import gameModel from "./src/models/gameModel.js";
import userModel from "./src/models/userModel.js";
import userGameModel from "./src/models/userGameModel.js";

async function insertData() {
    try {
        await mongoose.connect("mongodb://mongo:3310/PixelSafeDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");

        await gameModel.insertMany([
            {
                "title": "The Legend of Zelda: Breath of the Wild",
                "genre": "Acción-Aventura",
                "platforms": ["Nintendo Switch", "Wii U"]
            },
            {
                "title": "The Witcher 3: Wild Hunt",
                "genre": "RPG de mundo abierto",
                "platforms": ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch"]
            },
            {
                "title": "Red Dead Redemption 2",
                "genre": "Acción-Aventura",
                "platforms": ["PlayStation 4", "Xbox One", "PC", "Stadia"]
            },
            {
                "title": "Super Mario Odyssey",
                "genre": "Plataformas",
                "platforms": ["Nintendo Switch"]
            },
            {
                "title": "Persona 5",
                "genre": "RPG, Simulador de vida",
                "platforms": ["PlayStation 3", "PlayStation 4"]
            },
            {
                "title": "Fortnite",
                "genre": "Battle Royale, Shooter",
                "platforms": ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "iOS", "Android"]
            },
            {
                "title": "Among Us",
                "genre": "Multijugador en línea, Social Deduction",
                "platforms": ["PC", "iOS", "Android"]
            },
            {
                "title": "Minecraft",
                "genre": "Sandbox, Construcción",
                "platforms": ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "iOS", "Android"]
            },
            {
                "title": "Hades",
                "genre": "Roguelike, Acción",
                "platforms": ["PC", "Nintendo Switch"]
            },
            {
                "title": "Animal Crossing: New Horizons",
                "genre": "Simulador de vida",
                "platforms": ["Nintendo Switch"]
            }
        ]);

        const users = await userModel.insertMany([
            {
                "email": "usuario1@example.com",
                "username": "usuario1",
                "password": "contraseña1",
                "role": "user",
                "gamesList": "6127ff96e60e002078ced2aa"
            },
            {
                "email": "usuario2@example.com",
                "username": "usuario2",
                "password": "contraseña2",
                "role": "user",
                "gamesList": "6127ff96e60e002078ced2bb"
            },
            {
                "email": "usuario3@example.com",
                "username": "usuario3",
                "password": "contraseña3",
                "role": "user",
                "gamesList": "6127ff96e60e002078ced2cc"
            }
        ]);

        await userGameModel.insertMany([
            {
                "userId": "6127ff96e60e002078ced2aa",
                "ownedGames": [
                    {
                        "gameId": "6127ff96e60e002078ced2bb",
                        "platform": "PS4",
                        "dateAdded": "2024-05-23T10:00:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced2cc",
                        "platform": "Xbox One",
                        "dateAdded": "2024-05-24T14:30:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced2dd",
                        "platform": "PC",
                        "dateAdded": "2024-05-25T08:45:00Z"
                    }
                ],
                "pendingGames": [
                    {
                        "gameId": "6127ff96e60e002078ced2ee",
                        "platform": "Switch",
                        "dateAdded": "2024-05-26T12:15:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced2ff",
                        "platform": "PS5",
                        "dateAdded": "2024-05-27T16:20:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced211",
                        "platform": "Xbox Series X",
                        "dateAdded": "2024-05-28T09:30:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced222",
                        "platform": "PC",
                        "dateAdded": "2024-05-29T11:00:00Z"
                    }
                ]
            },
            {
                "userId": "6127ff96e60e002078ced2bb",
                "ownedGames": [
                    {
                        "gameId": "6127ff96e60e002078ced2cc",
                        "platform": "Xbox One",
                        "dateAdded": "2024-05-24T14:30:00Z"
                    },
                    {
                        "gameId": "6127ff96e60e002078ced2dd",
                        "platform": "PC",
                        "dateAdded": "2024-05-25T08:45:00Z"
                    }
                ],
                "pendingGames": [
                    {
                        "gameId": "6127ff96e60e002078ced2ee",
                        "platform": "Switch",
                        "dateAdded": "2024-05-26T12:15:00Z"
                    }
                ]
            },
            {
                "userId": "6127ff96e60e002078ced2cc",
                "ownedGames": [
                    {
                        "gameId": "6127ff96e60e002078ced2dd",
                        "platform": "PC",
                        "dateAdded": "2024-05-25T08:45:00Z"
                    }
                ],
                "pendingGames": []
            }
        ]);

        console.log("Datos insertados");
    } catch (error) {
        console.error("Hubo un problema al insertar los datos", error);
    } finally {
        mongoose.connection.close();
    }
}

insertData();
