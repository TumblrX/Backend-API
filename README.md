# TumlbrX API

TumblrX API is a clone of Tumblr's backend, it's a REST API that provides most of the functionalities of Tumblr website

## Installation
1. Download the files
    ```
    git clone https://github.com/TumblrX/Backend-API
    ```
2. Use the package manager npm to install required packages.

    ```bash
    npm install
    ```

## 🚀 Usage
1. Add `confing.env` file with your configurations
    ```
    NODE_ENV=ADD_YOUR_DATA
    PORT=ADD_YOUR_DATA
    SERVER=ADD_YOUR_DATA
    MONGODB_URL=ADD_YOUR_DATA
    MONGODB_PASS=ADD_YOUR_DATA
    GOOGLE_CLIENT_ID=ADD_YOUR_DATA
    PUSHER_APPID=ADD_YOUR_DATA
    PUSHER_KEY=ADD_YOUR_DATA
    PUSHER_SECRET=ADD_YOUR_DATA
    PUSHER_CLUSTER=ADD_YOUR_DATA
    REDIS_HOST=ADD_YOUR_DATA
    REDIS_PORT=ADD_YOUR_DATA
    ```
2. Start the server
    ```bash
    npm start
    ```
3. To send emails add email transporter to `controllers\mailer.js` and uncomment `controllers\userFuncitons\redisFunctions.js`
## Contributors ✨

Thanks go to these wonderful people :

<table>
  <tr>
    <td align="center"><a href="https://github.com/AndrewBoshra"><img src="https://avatars.githubusercontent.com/u/62408035?v=4" width="150px;" alt=""/><br /><sub><b>Andrew Boshra</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/BishoyAtef"><img src="https://avatars.githubusercontent.com/u/83448056?v=4" width="150px;" alt=""/><br /><sub><b>Bishoy Atef</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/yousefelmahdy"><img src="https://avatars.githubusercontent.com/u/62335520?v=4" width="150px;" alt=""/><br /><sub><b>Yousef Elmahdy</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/PeterAyad"><img src="https://avatars.githubusercontent.com/u/62403514?v=4" width="150px;" alt=""/><br /><sub><b>Peter Ayad</b></sub></a><br /></td>
  </tr>
 </table>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)