# ChatGPT API Integration

This project provides a simple API to interact with OpenAI's ChatGPT. It allows users to send messages and receive responses from the ChatGPT model.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd chatgpt-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your ChatGPT API key:
   ```
   CHATGPT_API_KEY=your_api_key_here
   ```

## Usage

To start the server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints

- `POST /api/chat/send`
  - Sends a message to the ChatGPT API and returns the response.
  - **Request Body:**
    ```json
    {
      "message": "Your message here"
    }
    ```

- `GET /api/chat/receive`
  - Receives messages from the ChatGPT API.

## Environment Variables

- `CHATGPT_API_KEY`: Your API key for accessing the ChatGPT service.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.