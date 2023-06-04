import React from 'react';

import FileInput from './components/FileInput';

const onLoaded = (cv) => {
  console.log('opencv loaded', cv);
};

function App() {
  return <FileInput />;
}

export default App;
