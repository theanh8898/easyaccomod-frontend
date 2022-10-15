import React from 'react';
import SlideShow from "./__components/SlideShow/SlideShow";
import Categories from "./__components/Categories/Categories";
import NewPosts from "./__components/NewPosts/NewPosts";
import NewSearch from '../../components/HeaderSearch/NewSearch';

function Home(props) {
  return (
    <div className="home-page page-paper">
      <SlideShow/>


      <NewSearch/>

      <Categories/>

      <NewPosts/>
    </div>
  );
}

export default Home;
