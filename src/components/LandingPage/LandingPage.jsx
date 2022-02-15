import React from 'react';
import { useHistory } from 'react-router-dom';
//import './LandingPage.css';
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import QuickLoadChar from '../QuickLoadChar/QuickLoadChar'
import LoginForm from '../LoginForm/LoginForm';
import NewCharacterForm from '../NewCharacterForm/NewCharacterForm'

function LandingPage() {
  const user = useSelector((store) => store.user);
  const character = useSelector((store) => store.character);
  return (
    <div id="landingPage">
      <div id="about" className="comp">
      <h2 >About BhūtVille:</h2>
          <p>
              I created this game out of pure nostalgia. I miss the old days of a long road trip, playing Zelda Oracle of Seasons.
              So i figured why not try and recreate one? This was a big stretch for myself since I didn't any experience with game design
              or development. Through this project I was introduced to Object Oriented Programing along with the concept of State Machines.
              I was also stretched for style design, since most of my past projects have not gone deep into prettifying. 
            <br></br><br></br>
              To get over these hurdles I had to heavily rely on the Phaser community as well as the Phaser Docs. Luckily the Docs were well
              written and the community is active! I also had the help of my Instructor as well as my cohort mates.
            <br></br><br></br>
              Special shout out to Tiled and <a href="https://pixel-boy.itch.io/">Pixel Boy.</a>
            </p>
            <br></br><br></br>
            <div>
              <h2>The tech used here was:</h2>
                <ul>
                  <li>Phaser</li>
                  <li>Node.js</li>
                  <li>JavaScript</li>
                  <li>Postgres</li>
                  <li>React</li>
                </ul>
            </div>
        </div>
        <div id="aboutCharSelect" className="comp">
        {user.id
          ? <><NewCharacterForm /><QuickLoadChar /></>
          : <LoginForm /> 
        }
        </div>
      </div>
  );
}

export default LandingPage;
