import React from 'react';
import Header from '../header/Header';
import Results from '../results/Results';
import Background from '../background/Background'
import MyRecipesContext from '../../context/MyRecipesContext';

function App() {
  return (
    <MyRecipesContext>
      <div className="app">
        <Header />
        <Results />
      </div>
      <Background />
    </MyRecipesContext>

  );
}

export default App;
