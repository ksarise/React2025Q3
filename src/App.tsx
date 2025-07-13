import React, { type ReactNode } from 'react';

import './App.css';
import { Home } from './Home.tsx';

class App extends React.Component {
  render(): ReactNode {
    return (
      <>
        <Home />
      </>
    );
  }
}

export default App;
