import { useRef, useState } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from "y-monaco"
import LanguagesDropdown from './LanguageDropdown'
import CompileButton from './CompileButton'
import InputWindow from './InputWindow'
import OutputWindow from './OutputWindow'
import { languageOptions } from '../data/languageOptions'
import randomColor from 'randomcolor'
import Client from './Client'
import CopyRoomButton from './CopyRoomButton'

const CodeEditor = ({ roomID }) => {

    const editorRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [currLang, setCurrLang] = useState(languageOptions[0]);
    const [compilerText, setCompilerText] = useState('');
    const [input, setInput] = useState('');

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const ydoc = new Y.Doc(); 
        const provider = new WebrtcProvider(roomID, ydoc, { signaling: [import.meta.env.VITE_BACKEND_URL] })
        const type = ydoc.getText("monaco"); 

        const undoManager = new Y.UndoManager(type)

        var person = prompt("Please enter your name");

        if (!person) {
            person = Math.floor(Math.random() * 10) + "User";
        }

        const awareness = provider.awareness;

        awareness.setLocalStateField("user", {
            name: person,
            color: randomColor(),
        });
            
        awareness.on('change', changes => {
            var jsonData = (Array.from(awareness.getStates().values()))
            setUsers(jsonData.map(item => item.user.name));
        })
            

        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), awareness);
        
        provider.connect();
    }

    return (
        <>
            <div className='flex flex-row space-x-3 pt-1 pb-3'>
                {users.map((user, index) => (
                    <Client
                    key={index} // Use the index as the key prop
                    username={user}
                    />
                ))}
            </div>
            <CopyRoomButton />
            <LanguagesDropdown currValue={currLang} onSelectChange={(event) => setCurrLang(event)}/>
            <Editor
                className='justify-center'
                language={currLang.value}
                height="50vh"
                width="100vw"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                options={{
                    cursorBlinking: "smooth",
                }}
            />
            <CompileButton content={editorRef} langauge={currLang.id} input={input} setOutput={(output) => {setCompilerText(output)}}/>
            <div className='flex md:flex-row md:space-x-2 flex-col'>
                <InputWindow setInput={(input) => {setInput(input)}}/>
                <OutputWindow outputDetails={compilerText} />
            </div>
        </>

    )
}

export default CodeEditor