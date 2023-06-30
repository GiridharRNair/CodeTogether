
# CodeTogether

This minimalistic collaborative code editor is developed using React, Monaco Editor, Yjs, and Tailwind CSS. It enables real-time collaboration, allowing multiple users to work together on the same code simultaneously. Yjs ensures seamless synchronization of edits, while the Monaco Editor offers a powerful code editing experience. Additionally, Tailwind CSS enhances the user interface, providing a modern and responsive design for an enhanced user experience.


## Environment Variables

To run this project, you will need to add the following environment variables to an .env file. These variables will allow you to use the [JDoodle compiler](https://rapidapi.com/judge0-official/api/judge0-ce) and sync the code to all connected users using [Y-Webrtc](https://github.com/yjs/y-webrtc).

`VITE_RAPID_API_HOST`=online-code-compiler.p.rapidapi.com

`VITE_RAPID_API_KEY`={Your API Compiler key from RapidAPI}

`VITE_RAPID_API_URL`=https://online-code-compiler.p.rapidapi.com/v1/

`VITE_BACKEND_URL`=wss://y-webrtc-signaling-eu.herokuapp.com/

If the back-end URL doesn't work, you can deploy your own [Y-Webrtc](https://github.com/yjs/y-webrtc) server. 


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

[Y-Monaco](https://github.com/yjs/y-monaco): An integration between Yjs and the Monaco Editor, providing real-time collaboration capabilities within the Monaco Editor. It allows multiple users to work together on the same code simultaneously.

[Y-Webrtc](https://github.com/yjs/y-webrtc): A backend server for Yjs that leverages WebRTC technology to enable real-time collaboration between multiple users.


## License

[MIT](https://choosealicense.com/licenses/mit/)

Feel free to contribute to this project by submitting issues or pull requests.

