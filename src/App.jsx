import { useRef } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"

// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const ydoc = new Y.Doc(); 
    const yarray = ydoc.getArray()
    const provider = new WebrtcProvider('webrtc-test', ydoc, { signaling: ['wss://backend-test-production-1d6f.up.railway.app']})
    const type = ydoc.getText("monaco"); 
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);     
    
    provider.on('synced', synced => {
      console.log('synced!', synced)
    })

    yarray.observeDeep(() => {
      console.log('yarray updated: ', yarray.toJSON())
    })
  }

  return (
    <Editor
      height="50vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  )
}

export default App