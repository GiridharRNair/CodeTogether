
# CodeTogether

This is a collaborative code editor that allows multiple users to work together on the same code in real-time using yjs. It is built using React and utilizes the Monaco Editor for the code editing functionality. 


## Environment Variables

To run this project, you will need to add the following environment variables to an .env file. These variables will allow you to use the [Judge0 API Compiler](https://rapidapi.com/judge0-official/api/judge0-ce) and sync the code to all connected users using [y-webrtc](https://github.com/yjs/y-webrtc).

`VITE_RAPID_API_HOST`=judge0-ce.p.rapidapi.com

`VITE_RAPID_API_KEY`={Your Judge0 API Compiler key}

`VITE_RAPID_API_URL`=https://judge0-ce.p.rapidapi.com/submissions/

`VITE_BACKEND_URL`=wss://y-webrtc-signaling-eu.herokuapp.com/

If the back-end URL doesn't work, you can deploy your own [y-webrtc](https://github.com/yjs/y-webrtc). 


## Run Locally

Clone the project

```bash
  git clone https://github.com/SyntaxWarrior30/CodeTogether.git
```

Go to the project directory

```bash
  cd CodeTogether
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```


## Credits

This project utilizes the following open-source technologies:

[Yjs](https://github.com/yjs/yjs): A real-time collaboration framework that enables shared editing of documents in a distributed environment.

[Y-Webrtc](https://github.com/yjs/y-webrtc): A backend server for Yjs that leverages WebRTC technology to enable real-time collaboration between multiple users.


## License

[MIT](https://choosealicense.com/licenses/mit/)

Feel free to contribute to this project by submitting issues or pull requests.

