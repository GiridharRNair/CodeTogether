import { React, useState } from 'react';
import axios from 'axios';

const currStatus = ['Running', 'Running.', 'Running..', ' Running...'];
const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

function CompileButton({ content, langauge, input, setOutput }) {
  
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('Compile and Execute');

    let intervalId;
    var statusChange = 0;

    function hasNonLatin1Characters(str) {
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode > 255) {
                return true;
            }
        }
        return false;
    }

    function statusUpdate () {
        if (statusChange === 0) {
            setStatus(currStatus[0]);
            statusChange++;
        } else if (statusChange === 1) {
            statusChange++;
            setStatus(currStatus[1]);
        } else if (statusChange === 2) {
            statusChange++;
            setStatus(currStatus[2]);
        } else {
            statusChange = 0;
            setStatus(currStatus[3]);
        }
    }

    function startInterval () {
        intervalId = setInterval(statusUpdate, 300);
    }
    
    function stopInterval () {
        clearInterval(intervalId);
        setStatus('Compile and Execute');
    }

    async function compileCode() {
        setProcessing(true);
        var sourceCode = content.current.getValue().replace(regex, '')

        if(!sourceCode || hasNonLatin1Characters(sourceCode)) {
            alert('Cannot compile. Code editor either contains special characters or is empty.')
            setProcessing(false);
            return;
        }

        startInterval();
        
        const options = {
            method: 'POST',
            url: import.meta.env.VITE_RAPID_API_URL,
            headers: {
                "content-type": "application/json",
                'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
            },
            data: {
                language: langauge.id,
                version: 'latest',
                code: sourceCode,
                input: input,
            }
        };
        
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data)
                setOutput(response.data)
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                setOutput(error)
                console.log(error);
            })
            .finally(() => {
                setProcessing(false);
                stopInterval();
            });
    }


    return (
        <button aria-label="Compile Button" className="flex justify-center items-center w-52 mr-1 relative px-5 py-1 overflow-hidden border border-black rounded group" disabled={processing} onClick={compileCode}>
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">{status}</span>
        </button>
    )
}

export default CompileButton