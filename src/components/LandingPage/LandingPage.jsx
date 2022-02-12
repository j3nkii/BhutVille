import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import QuickLoadChar from '../QuickLoadChar/QuickLoadChar'
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const user = useSelector((store) => store.user);
  const character = useSelector((store) => store.character);
  return (
    <div className="container">
      <h2>About BhūtVille:</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            I created this game out of pure nostalgia. I miss the old days of a long road trip, playing Zelda Oracle of Seasons.
            So i figured why not try and recreate one? This was a big stretch for myself since I didn't any experience with game design
            or development. Through this project I was introduced to Object Oriented Programing along with the concept of State Machines.
            I was also stretched for style design, since most of my past projects have not gone deep into prettifying. 
            <br></br><br></br>
            To get over these hurdles I had to heavily rely on the Phaser community as well as the Phaser Docs. Luckily the Docs were well
            written and the community is active! I also had the help of my Instructor as well as my cohort mates, granted they didn't know 
            what was going on with my code, as we're doing full stack stuff and not game dev stuff, they know syntax and logic mistakes when they see them.
            <br></br><br></br>
            Special shout out to Tiled and Pixel Boy.
            </p>
            <br></br><br></br>
            The tech used here was:
              <ul>
                <li>Phaser</li>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>Postgres</li>
                <li>React</li>
              </ul>
          
        </div>
        <div className="grid-col grid-col_4">
        {user.id
          ? <QuickLoadChar />
          : <LoginForm /> 
        }
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
