import React from 'react';
//import '../../../public/Game';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (<>
      <div><button className="btn"><a href="./game.html" target="blank">TO BHUTVILLE GAME</a></button></div>
    </>
  )
}

export default InfoPage;
