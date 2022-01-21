import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

import Articles from './pages/article';
import Authentication from './pages/authentication';
import CreateArticle from './pages/createArticle/createArticle';
import EditArticle from './pages/editArticle';
import GlobalFeed from './pages/globalFeed';
import Settings from './pages/settings';
import TagFeed from './pages/tagFeed';
import UserProfile from './pages/userProfile';
import YourFeed from './pages/yourFeed';

const Routers = () => {
  const matchTag = useMatch('/tags/:slug');
  const matchArt = useMatch('/articles/:slug');
  const matchEdit = useMatch('/articles/:slug/edit');
  const matchProfile = useMatch('/profiles/:slug');
  const matchProfileFavorites = useMatch('/profiles/:slug/favorites');

  return (
    <div>
      <Routes>
        <Route path="/" element={<GlobalFeed />} />
        <Route path="/profiles/:slug" element={<UserProfile match={matchProfile} />} />
        <Route
          path="/profiles/:slug/favorites"
          element={<UserProfile match={matchProfileFavorites} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/feed" element={<YourFeed />} />
        <Route path="/articles/new" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle match={matchEdit} />} />
        <Route path="/tags/:slug" element={<TagFeed match={matchTag} />} />
        <Route path="/articles/:slug" element={<Articles match={matchArt} />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/register" element={<Authentication />} />
      </Routes>
    </div>
  );
};

export default Routers;
