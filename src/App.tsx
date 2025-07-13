import React, { type ReactNode } from 'react';
import './App.css';
import { Home } from './Home';

class App extends React.Component {
  render(): ReactNode {
    return (
      <>
        <div className="container mx-auto">
          <Home />
        </div>
      </>
    );
  }
}

export default App;
