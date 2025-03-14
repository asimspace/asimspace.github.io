import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const BingoGuide = ({ show, hide }) => (
  <Offcanvas show={show} onHide={hide}>
    <Offcanvas.Header className="bg-primary" closeButton>
      <Offcanvas.Title className="lead text-white">How To Play Bingo?</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <p>The Players can get <Link className="text-danger" to="/bingo-card">bingo-card here!</Link></p>
      <h3 className="lead">1️⃣ Get a Bingo Card</h3>
      <p>
        - Each player gets a <Link className="text-danger" to="/bingo-card">bingo-card</Link> with 5 columns labeled B, I, N, G, O. <br/>
        - The card has random numbers under each letter.<br/>
        - The center square with star is a <strong>free space</strong>—everyone gets it for free!<br/>
      </p>

      <h3 className="lead">2️⃣ Listen for the Numbers</h3>
      <p>- A CALLER picks and announces numbers. <br/>(e.g., <strong>"B-12"</strong> or <strong>"G-50"</strong>).<br/>
      <Link className="btn btn-primary btn-xs rounded-0" to="/play-bingo">Bingo Number Picker!</Link></p>

      <h3 className="lead">3️⃣ Mark Your Card  </h3>
      <p>- If the announced number is on your card, mark it (use a marker or chips).</p>

      <h3 className="lead">4️⃣ Win by Completing a Pattern </h3>
      <p>
        - You win if you mark 5 in a row (horizontal, vertical, or diagonal). <br/> 
        - Some games have special patterns like a full card (blackout).</p>  

      <h3 className="lead">5️⃣ Shout <b>"Bingoooo!"</b>  </h3>
      <p>- If you complete a pattern, yell "Bingo!" before the next number is called.  <br/>
      - The game host checks your card to confirm. </p> 

      <h3 className="lead">6️⃣ Claim Your Prize 🎁  </h3>
      <p>- If your Bingo is correct, you win!  <br/>
        - The Caller will click Bingo button and reset the game. New Game will start!<br/>
        - If it is incorrect, the game continues. 
      </p> 
      <h3 className="lead">Enjoy playing Bingo! 🎊😊 </h3>
    </Offcanvas.Body>
  </Offcanvas>
);

export default BingoGuide;