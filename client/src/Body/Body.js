import React from 'react'
import { useState } from 'react'
import './Body.css'
import axios from 'axios';




export default function Body() {
    const [inputFiles, setInputFiles] = useState([])
    const domain = 'https://settling-prawn-daily.ngrok-free.app';
    // const domain = `http://localhost:5000`;

    function handleFile(event){
        setInputFiles(event.target.files);
        console.log(inputFiles)
    }

    function handleUpload(){
        console.log('process');
        const formData = new FormData();
        for (let i = 0; i < inputFiles.length; i++){
            formData.append("files", inputFiles[i])
        }

        const url = `${domain}/get-inference`
        axios.post(url, formData)
        .then(data => {
            console.log(data['Message'])
        });
    }

    function handleDownload() {
        console.log('downloading ...') 
        axios.post(`${domain}/download`, 'testString', {responseType: 'blob'})
        .then((res) => {
            console.log(res.data)
            const url = window.URL.createObjectURL(
                new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
            'download',
            'segmentations.zip',
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
        }
    

  return (
    <div className="parent">
        <div className="Body">
        <h2 className="Upload-title">Upload Your File Here: </h2>
        <div className="File-upload">
            <div className="input-container">
                <div className="UploadText">Drag and Drop or Click on the Box to Upload Your Files</div>
                <form>
                    <input type="file" multiple className="file" onChange={handleFile}/>
                </form>
            </div>          
        </div>    
        <button className="Inference-button" onClick={handleUpload}>Process</button>
        
        </div>
        <div className="Output">
            <h1>Output</h1>

            <button className="Output-button" onClick={() => handleDownload()}>
                Download Segmentations
            </button>
        </div>
    </div>
    
  )
}


