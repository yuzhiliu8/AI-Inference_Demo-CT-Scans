import React from 'react'
import './Header.css'

export default function Header() {
  const title = "AI Segmentator"
  const githubLink = "https://github.com/yuzhiliu8/AI-Inference_Demo-CT-Scans"
  return (
    <div className="Header">
        <h1>{title}</h1>
        <h3>Upload CT Scan Files and Press Process to Analyze!</h3>
        <a href={githubLink} target="_blank" rel="noreferrer" >Check out the GitHub Repo!</a>
      </div>
  )
}
