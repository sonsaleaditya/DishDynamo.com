# MERN Recipe App

A full-stack web application for managing and sharing recipes, built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication and authorization
- Add, edit, and delete recipes
- Search and filter recipes
- Upload recipe images
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
       ```bash
       git clone https://github.com/your-username/MERN-Recipe-App.git
       ```
2. Navigate to the project directory:
       ```bash
       cd MERN-Recipe-App
       ```
3. Install server dependencies:
       ```bash
       cd server
       npm install
       ```
4. Install client dependencies:
       ```bash
       cd ../client
       npm install
       ```

## Usage

1. Start the server:
       ```bash
       cd server
       npm start
       ```
2. Start the client:
       ```bash
       cd ../client
       npm start
       ```
3. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the `server` directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Bootstrap

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgments

- Inspired by various recipe-sharing platforms.
- Thanks to the open-source community for their amazing tools and libraries.
- Special thanks to all contributors!
