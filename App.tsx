import React from 'react';
import { ScrollAdventure } from './components/ScrollAdventure';
import { sections } from './data/content';

const App: React.FC = () => {
  return (
    <main className="w-full h-screen">
      <ScrollAdventure sections={sections} />
    </main>
  );
};

export default App;