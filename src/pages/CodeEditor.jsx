import { useRef, useState } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from "y-monaco"
import LanguagesDropdown from '../components/LanguageDropdown'
import CompileButton from '../components/CompileButton'
import InputWindow from '../components/InputWindow'
import OutputWindow from '../components/OutputWindow'
import { languageOptions } from '../data/languageOptions'
import randomColor from 'randomcolor'
import Client from '../components/Client'
import CopyRoomButton from '../components/CopyRoomButton'
import OutputDetails from '../components/OutputDetails'

const CodeEditor = ({ roomID }) => {

    const editorRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [hideUsers, setHideUsers] = useState(false);
    const [currLang, setCurrLang] = useState(languageOptions[0]);
    const [compilerText, setCompilerText] = useState('');
    const [input, setInput] = useState('');
    const randomUserColor = randomColor();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.getModel().setEOL(0);
        const ydoc = new Y.Doc(); 
        const provider = new WebrtcProvider(roomID, ydoc, { signaling: [import.meta.env.VITE_BACKEND_URL] })
        const type = ydoc.getText("monaco"); 

        const undoManager = new Y.UndoManager(type)

        var person = prompt("Please enter your name, under 10 characters");

        if (!person || person.trim() === '' || person.trim() === '\u200B') {
            person = Math.floor(Math.random() * 10) + "User";
        } else {
            person = person.trim().slice(0, 10);
        }        

        const awareness = provider.awareness;

        awareness.setLocalStateField("user", {
            name: person,
            color: randomUserColor
        });
            
        awareness.on('change', changes => {
            var jsonData = Array.from(awareness.getStates());
            if (jsonData.length > 1) {
                setHideUsers(false);
                setUsers(jsonData.map(item => ({
                    clientId: item[0],
                    name: item[1].user.name,
                    color: item[1].user.color
                })));
            } else {
                setHideUsers(true);
            }
        });        

        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), awareness);
        
        awareness.on('update', () => {
            var jsonData = Array.from(awareness.getStates());

            var clientsArr = jsonData.map(item => ({
                clientId: item[0],
                name: item[1].user.name,
                color: item[1].user.color
            }));

            clientsArr.forEach(client => {
                const selectionClass = `yRemoteSelection-${client.clientId}`;
                const selectionHeadClass = `yRemoteSelectionHead-${client.clientId}`;
                const selectionStyle = document.createElement('style');
                selectionStyle.innerHTML = `
                    .${selectionClass} {
                        background-color: ${client.color};
                    }

                    .${selectionHeadClass} {
                        position: absolute;
                        border-left: ${client.color} solid 2px;
                        border-top: ${client.color} solid 2px;
                        border-bottom: ${client.color} solid 2px;
                        height: 100%;
                        box-sizing: border-box;
                    }

                    .${selectionHeadClass}::after {
                        position: absolute;
                        content: ' ';
                        border: 3px solid ${client.color};
                        border-radius: 4px;
                        left: -4px;
                        top: -5px;
                    }

                    .${selectionHeadClass}:hover::before {
                        content: '${client.name}';
                        position: absolute;
                        color: ${client.color};
                        padding-left: 3px;
                        font-size: 12px;
                    }
                `;
                document.head.appendChild(selectionStyle);
            });
        });          

        provider.connect();
    }

    return (
        <div className='mx-5 space-y-1 py-1'>
            <div className='flex flex-row space-x-3'>
                {hideUsers ? null : (
                    <div className='flex flex-row space-x-3'>
                        {users.map((user) => (
                            <Client key={user.clientId} username={user.name} color={user.color} />
                        ))}
                    </div>
                )}
            </div>
            <LanguagesDropdown currValue={currLang} onSelectChange={(event) => setCurrLang(event)}/>
            <Editor
                className='justify-center'
                language={currLang.value}
                height="50vh"
                theme='vs-dark'
                onMount={handleEditorDidMount}
                options={{
                    cursorBlinking: "smooth",
                }}
            />
            <div className='flex flex-row'>
                <CompileButton content={editorRef} langauge={currLang.id} input={input} setOutput={(output) => {setCompilerText(output)}}/>
                <CopyRoomButton />
            </div>
            <div className='flex md:flex-row md:space-x-2 flex-col'>
                <InputWindow setInput={(input) => {setInput(input)}}/>
                <OutputWindow outputDetails={compilerText}/>
            </div>
            <OutputDetails outputDetails={compilerText}/>
        </div>
    )
}

export default CodeEditor