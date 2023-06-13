import { React, useState } from 'react';
import axios from 'axios';

const currStatus = ['Running', 'Running.', 'Running..', ' Running...'];

function CompileButton({ content, langauge, input, setOutput }) {
  
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
        startInterval();

        const formData = {
            language_id: langauge,
            source_code: window.btoa(content.current.getValue()),
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
        <button className='md:w-48 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-1' disabled={processing} onClick={compileCode}>{status}</button>
    )
}

export default CompileButton