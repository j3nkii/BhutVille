import React from 'react';
import Game from './Game'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (<>
    <div id="BhutVilleCanvas">
      <canvas></canvas>
    </div>
    </>
  )
}

export default InfoPage;
