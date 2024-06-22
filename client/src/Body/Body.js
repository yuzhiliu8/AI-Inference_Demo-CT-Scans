import React from 'react'
import { useState } from 'react'
import './Body.css'
import axios from 'axios';




export default function Body() {
    const [inputFile, setInputFile] = useState()
    const [outputFile, setOutputFile] = useState()
    

    function handleFile(event){
        setInputFile(event.target.files[0]);
        if (inputFile){
            console.log(inputFile);
        }
        
    }

    function handleUpload(){
        const formData = new FormData();
        formData.append("file", inputFile);

        axios.post("http://localhost:5000/get-inference", formData)
        .then(data => {
            setOutputFile(data)
            console.log(data)
            console.log(outputFile)
        });
    }

  return (
    <div className="parent">
        <div className="Body" onLoad={() => setInputFile('')}>
        <h2 className="Upload-title">Upload Your File Here: </h2>
        <div className="File-upload">
            <div className="input-container">
                <div className="UploadText">Drag and Drop or Click on the Box to Upload Your Files</div>
                {/* <p>{file}</p> */}
                <form>
                    <input type="file" className="file" onChange={handleFile}/>
                </form>
            </div>          
        </div>    
        <button className="Inference-button" onClick={handleUpload}>Process</button>
        
        </div>
        <div className="Output">
            <h1>Output</h1>

            <div className="Output-container">
                <p>hi</p>
                <p>hello</p>

            </div>
        </div>
    </div>
    
  )
}


