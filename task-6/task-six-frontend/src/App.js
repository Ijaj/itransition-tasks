import React from 'react';
import DrawingBoard from './components/DrawingBoard';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Start from './Start';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/start' element={<Start />} />
          <Route path='/draw' element={<DrawingBoard />} />
          <Route path='/*' element={<Navigate to="/draw" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
