import React from 'react'
import { useState } from 'react'
import './Body.css'
import axios from 'axios';




export default function Body() {
    const [inputFiles, setInputFiles] = useState([])
    // const [outputFile, setOutputFile] = useState()
    

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

        const url = "https://working-tetra-miserably.ngrok-free.app/get-inference"
        axios.post(url, formData)
        .then(data => {
            console.log(data)
        });
    }

    function handleDownload(){
        console.log('downloading ...')
        const url = `https://working-tetra-miserably.ngrok-free.app/download`
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'file';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url)
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

            <div className="Output-container">
                <button onClick={() => handleDownload()}>
                    Download Segmentations
                </button>
            </div>
        </div>
    </div>
    
  )
}


