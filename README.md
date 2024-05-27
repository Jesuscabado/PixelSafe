# PixelSafe
# Game Management API

## Overview

This project is a Game Management API built using Node.js and MongoDB. It allows users to manage their game collections, including adding, updating, and removing games from their owned and pending lists. The API also manages the relationships between users and their games, ensuring data integrity and consistency.

## Features

- **Game Management**: CRUD operations for games in the database.
- **User-Game Relationships**: Manage games owned by users and games pending to be played by users.
- **Data Consistency**: Ensures that when games are added to user lists, they are also present in the games database.
- **Error Handling**: Proper error handling for all operations to ensure robust API behavior.



## Endpoints

### Game Endpoints

- **GET /games**: Retrieve all games.
- **GET /games/:id**: Retrieve a game by its ID.
- **POST /games**: Create a new game.
- **PUT /games/:id**: Update a game by its ID.
- **DELETE /games/:id**: Delete a game by its ID.

### User-Game Endpoints

- **GET /userGames**: Retrieve all user-game relationships.
- **GET /userGames/:id**: Retrieve a user-game relationship by its ID.
- **POST /userGames**: Create a new user-game relationship.
- **PUT /userGames/:id**: Update a user-game relationship by its ID.
- **DELETE /userGames/:id**: Delete a user-game relationship by its ID.

## Usage

### Prerequisites

- Node.js
- MongoDB

### Installation


## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Feel free to modify this README to better fit your project's specifics.
