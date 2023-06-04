import React from "react";
import {OpenCvProvider} from "opencv-react";

import FileInput from "./components/FileInput";

const onLoaded = (cv) => {
    console.log('opencv loaded', cv)
  }

function App() {
  return (
      <OpenCvProvider onLoad={onLoaded} openCvPath='/opencv/opencv.js'>
        <FileInput/>
      </OpenCvProvider>

  );
}

export default App;
