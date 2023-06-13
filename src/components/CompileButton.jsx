import { React, useState } from 'react';
import axios from 'axios';

const currStatus = ['Running', 'Running.', 'Running..', ' Running...'];

function CompileButton({ content, langauge, input, setOutput }) {
  
    const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('Compile and Execute');

    let intervalId;
    var statusChange = 0;

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
        setProcessing(true);
        intervalId = setInterval(statusUpdate, 300);
    }
    
    function stopInterval () {
        setProcessing(false);
        clearInterval(intervalId);
        setStatus('Compile and Execute');
    }

    async function compileCode() {
        var sourceCode = content.current.getValue().replace(regex, '')
        
        if(!sourceCode) {
            return;
        }

        startInterval();

        const formData = {
            language_id: langauge,
            source_code: window.btoa(sourceCode),
            stdin: window.btoa(input),
        };
        
        const options = {
            url: import.meta.env.VITE_RAPID_API_URL,
            method: 'POST',
            params: { base64_encoded: true, wait: false },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
            },
            data: formData,
        };
        
        axios
            .request(options)
            .then(function (response) {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                stopInterval();
                console.log(error);
            });
        }
        
        const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: import.meta.env.VITE_RAPID_API_URL + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
                "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            },
        };

        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
            return
            } else {
                stopInterval();
                setOutput(response.data)
                return
            }
        } catch (err) {
                console.log("err", err);
                stopInterval();
            }
        };

    return (
        <button className='w-48 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-1' disabled={processing} onClick={compileCode}>{status}</button>
    )
}

export default CompileButton