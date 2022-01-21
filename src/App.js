import React from 'react';

import TopBar from './node_moduls/components/topBar';
import Routers from './node_moduls/routers';
import { CurrentUserProvider } from './node_moduls/contexts/currentUser';
import CurrentUserChecker from './node_moduls/components/currentUserChecker';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <TopBar />
        <Routers />
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
