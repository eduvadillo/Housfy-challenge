import { useEffect, useState } from "react";
import "./App.css";
import keyF from "./assets/images/teclaF.png";
import keyR from "./assets/images/teclaR.png";
import keyL from "./assets/images/teclaL.png";

function App() {
  const [loading, setLoading] = useState(true);
  const [positionXObstacle, setpositionXObstacle] = useState(``);
  const [positionYObstacle, setPositionYObstacle] = useState(``);
  const [roverToGrey, setRoverToGrey] = useState(``);
  const [roverToGreen, setRoverToGreen] = useState(``);
  const [boardBorderColor, setBoardBorderColor] = useState(`3px solid green`);
  const [activeMovement, setActiveMovement] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [rover, setRover] = useState({
    order: ``,
    positionX: 11,
    angleToForward: `r`,
    actualPosition: `E`,
    positionY: 13,
  });

  const [border, setBorder] = useState({
    right: `3px solid blue`,
    left: ``,
    top: ``,
    bottom: ``,
  });

  const isMobile = width <= 450;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  console.log(`soy el witdth`, width, `y el roverToGreyX`, roverToGrey, `ìts mobile`, isMobile);

  useEffect(() => {
    if (isMobile !== true) {
      let positionXObstacle = Math.floor(Math.random() * (300 - 1)) + 100;

      setpositionXObstacle(positionXObstacle);

      let positionYObstacle = Math.floor(Math.random() * (300 - 1)) + 100;
      setPositionYObstacle(positionYObstacle);
      console.log(`more than 450`);
      setRoverToGrey(389);
      setRoverToGreen(110);
    } else {
      let positionXObstacle = Math.floor(Math.random() * (230 - 1)) + 50;

      setpositionXObstacle(positionXObstacle);

      let positionYObstacle = Math.floor(Math.random() * (230 - 1)) + 50;
      setPositionYObstacle(positionYObstacle);
      console.log(`less than 450`);
      setRoverToGrey(289);
      setRoverToGreen(60);
    }
  }, []);

  let boardHeight = 500;
  let boardWidth = 500;

  const board = {
    height: `${boardHeight}px`,
    width: `${boardWidth}px`,
    border: `${boardBorderColor}`,
    background: `#00ffe2cc`,
  };

  const positionObstacle = {
    position: "absolute",
    width: `100px`,
    background: "red",
    height: `100px`,
    marginLeft: `${positionXObstacle}px`,
    marginTop: `${positionYObstacle}px`,
  };

  let roverStyle = {
    position: "absolute",
    width: `100px`,
    background:
      rover.positionX > positionXObstacle - roverToGreen &&
      rover.positionX <= positionXObstacle + roverToGreen &&
      rover.positionY > positionYObstacle - roverToGreen &&
      rover.positionY < positionYObstacle + roverToGreen
        ? `green`
        : rover.positionX < 11 ||
          rover.positionX > roverToGrey ||
          rover.positionY < 12 ||
          rover.positionY > roverToGrey
        ? "grey"
        : "purple",
    height: `100px`,
    marginLeft: `${rover.positionX}px`,
    marginTop: `${rover.positionY}px`,
    transform: `rotate(${rover.angleToForward}deg)`,
    borderRight: `${border.right}`,
    borderLeft: `${border.left}`,
    borderBottom: `${border.bottom}`,
    borderTop: `${border.top}`,
  };

  let lastLetter = rover.order[rover.order.length - 1];

  let eastPosition = rover.actualPosition === "E";
  let northPosition = rover.actualPosition === "N";
  let westPosition = rover.actualPosition === "W";
  let southPosition = rover.actualPosition === "S";

  let roverColorPurple = roverStyle.background !== `green`;
  let roverColorGrey = roverStyle.background === `grey`;
  let roverColorGreen = roverStyle.background === `green`;

  useEffect(() => {
    if (roverStyle.background === "grey") {
      setBoardBorderColor(`3px solid red`);
    }

    if (roverStyle.background === "purple") {
      setBoardBorderColor(`3px solid green`);
    }
  }, [roverStyle.background]);

  useEffect(() => {
    if (lastLetter === `f` && eastPosition && roverColorPurple) {
      setRover({ ...rover, positionX: rover.positionX + 10 });
    }

    if (lastLetter === `f` && westPosition && roverColorPurple) {
      setRover({ ...rover, positionX: rover.positionX - 10 });
    }

    if (lastLetter === `f` && northPosition && roverColorPurple) {
      setRover({ ...rover, positionY: rover.positionY - 10 });
    }

    if (lastLetter === `f` && southPosition && roverColorPurple) {
      setRover({ ...rover, positionY: rover.positionY + 10 });
    }

    if (lastLetter === `f` && eastPosition && rover.positionX > 19 && roverColorGrey) {
      setRover({ ...rover, positionX: rover.positionX - 20 });
    }

    if (lastLetter === `f` && westPosition && rover.positionX < 381 && roverColorGrey) {
      setRover({ ...rover, positionX: rover.positionX + 20 });
    }

    if (lastLetter === `f` && northPosition && rover.positionY < 381 && roverColorGrey) {
      setRover({ ...rover, positionY: rover.positionY + 20 });
    }

    if (lastLetter === `f` && southPosition && rover.positionY > 21 && roverColorGrey) {
      setRover({ ...rover, positionY: rover.positionY - 20 });
    }

    if (
      lastLetter === `f` &&
      eastPosition &&
      rover.positionX + 110 > positionXObstacle &&
      roverColorGreen
    ) {
      setRover({ ...rover, positionX: rover.positionX - 20 });
    }

    if (
      lastLetter === `f` &&
      eastPosition &&
      rover.positionX - 100 > positionXObstacle &&
      rover.positionX < positionXObstacle + 112 &&
      roverColorGreen
    ) {
      setRover({ ...rover, positionX: rover.positionX + 20 });
    }

    if (
      lastLetter === `f` &&
      eastPosition &&
      rover.positionX - 46 > positionXObstacle &&
      rover.positionX <= positionXObstacle + 59 &&
      roverColorGreen &&
      isMobile === true
    ) {
      setRover({ ...rover, positionX: rover.positionX + 20 });
    }

    if (
      lastLetter === `f` &&
      westPosition &&
      rover.positionX + 107 > positionXObstacle &&
      roverColorGreen
    ) {
      console.log(`desde west con +20x`);
      setRover({ ...rover, positionX: rover.positionX + 20 });
    }

    if (
      lastLetter === `f` &&
      westPosition &&
      rover.positionX + 115 > positionXObstacle &&
      rover.positionX < positionXObstacle - 95 &&
      roverColorGreen
    ) {
      console.log(`desde west  con -20x`);
      setRover({ ...rover, positionX: rover.positionX - 20 });
    }

    if (
      lastLetter === `f` &&
      westPosition &&
      rover.positionX + 107 > positionXObstacle &&
      roverColorGreen &&
      isMobile === false
    ) {
      setRover({ ...rover, positionX: rover.positionX + 20 });
    }

    if (
      lastLetter === `f` &&
      westPosition &&
      rover.positionX + 59 >= positionXObstacle &&
      rover.positionX < positionXObstacle - 46 &&
      roverColorGreen &&
      isMobile === true
    ) {
      console.log(`desde west mobile con -20x`);
      setRover({ ...rover, positionX: rover.positionX - 20 });
    }

    if (
      lastLetter === `f` &&
      northPosition &&
      rover.positionY + 112 > positionYObstacle &&
      roverColorGreen
    ) {
      setRover({ ...rover, positionY: rover.positionY + 20 });
    }

    if (
      lastLetter === `f` &&
      northPosition &&
      rover.positionY + 122 > positionYObstacle &&
      rover.positionY + 100 < positionYObstacle &&
      roverColorGreen
    ) {
      setRover({ ...rover, positionY: rover.positionY - 20 });
    }

    if (
      lastLetter === `f` &&
      northPosition &&
      rover.positionY + 59 > positionYObstacle &&
      rover.positionY < positionYObstacle - 50 &&
      roverColorGreen &&
      isMobile === true
    ) {
      console.log(`vaya en el rover north subiendo`);
      setRover({ ...rover, positionY: rover.positionY - 20 });
    }

    if (
      lastLetter === `f` &&
      southPosition &&
      rover.positionY + 90 < positionYObstacle &&
      roverColorGreen &&
      isMobile === false
    ) {
      console.log(`vaya en el rover south subiendo`);
      setRover({ ...rover, positionY: rover.positionY - 20 });
    }

    if (
      lastLetter === `f` &&
      southPosition &&
      rover.positionY + 45 < positionYObstacle &&
      roverColorGreen &&
      isMobile === true
    ) {
      console.log(`vaya en el rover south subiendo`);
      setRover({ ...rover, positionY: rover.positionY - 20 });
    }

    if (
      lastLetter === `f` &&
      southPosition &&
      rover.positionY <= positionYObstacle + 57 &&
      rover.positionY - 47 > positionYObstacle &&
      roverColorGreen &&
      isMobile === true
    ) {
      console.log(`vaya en el rover bajando`);
      setRover({ ...rover, positionY: rover.positionY + 20 });
    }

    if (
      lastLetter === `f` &&
      southPosition &&
      rover.positionY < positionYObstacle + 110 &&
      rover.positionY - 100 > positionYObstacle &&
      roverColorGreen &&
      isMobile === false
    ) {
      console.log(`vaya en el rover bajando`);
      setRover({ ...rover, positionY: rover.positionY + 20 });
    }

    /*     if (
      lastLetter === `f` &&
      southPosition &&
      rover.positionY + 110 < positionYObstacle &&
      roverColorGreen
    ) {
      setRover({ ...rover, positionY: rover.positionY + 20 });
    } */

    if (lastLetter === `r` && rover.actualPosition === `N`) {
      setRover({ ...rover, actualPosition: `E` });
      setBorder({ right: `3px solid blue`, top: `` });
    }

    if (lastLetter === `r` && rover.actualPosition === `E`) {
      setRover({ ...rover, actualPosition: `S` });
      setBorder({ bottom: `3px solid blue`, right: `` });
    }

    if (lastLetter === `r` && rover.actualPosition === `S`) {
      setRover({ ...rover, actualPosition: `W` });
      setBorder({ left: `3px solid blue`, bottom: `` });
    }

    if (lastLetter === `r` && rover.actualPosition === `W`) {
      setRover({ ...rover, actualPosition: `N` });
      setBorder({ top: `3px solid blue`, left: `` });
    }

    if (lastLetter === `l` && rover.actualPosition === `N`) {
      setRover({ ...rover, actualPosition: `W` });
      setBorder({ left: `3px solid blue`, top: `` });
    }

    if (lastLetter === `l` && rover.actualPosition === `W`) {
      setRover({ ...rover, actualPosition: `S` });
      setBorder({ bottom: `3px solid blue`, left: `` });
    }

    if (lastLetter === `l` && rover.actualPosition === `S`) {
      setRover({ ...rover, actualPosition: `E` });
      setBorder({ right: `3px solid blue`, bottom: `` });
    }

    if (lastLetter === `l` && rover.actualPosition === `E`) {
      setRover({ ...rover, actualPosition: `N` });
      setBorder({ top: `3px solid blue`, right: `` });
    }
  }, [activeMovement]);

  const handleSubmitStart = (e) => {
    e.preventDefault();

    setLoading(false);
  };

  const handleOrderLeft = (e) => {
    setRover({ ...rover, order: `l` });

    if (activeMovement === true) {
      setRover({ ...rover, order: `l` });
      setActiveMovement(false);
    }

    if (activeMovement === false) {
      setRover({ ...rover, order: `l` });
      setActiveMovement(true);
    }
  };

  const handleOrderRight = (e) => {
    if (activeMovement === true) {
      setRover({ ...rover, order: `r` });
      setActiveMovement(false);
    }

    if (activeMovement === false) {
      setRover({ ...rover, order: `r` });
      setActiveMovement(true);
    }
  };

  const handleOrderForward = (e) => {
    if (activeMovement === true) {
      setRover({ ...rover, order: `f` });
      setActiveMovement(false);
    }

    if (activeMovement === false) {
      setRover({ ...rover, order: `f` });
      setActiveMovement(true);
    }
  };

  if (loading === true) {
    return (
      <div className='frontpage-container'>
        <div className='title-frontpage'>
          <h1> Mars Rover Mission</h1>
        </div>
        <div className='title-frontpage-container'>
          <h2> Housfy Technical Challenge</h2>
          <h4> By Edu Vadillo</h4>
        </div>
        <div className='button-frontpage-container'>
          <form onSubmit={handleSubmitStart}>
            <button className='button-start-mission' type='submit'>
              Start the Mission!
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className='App'>
          <div style={board} className='board-div'>
            <div style={roverStyle} className='rover-p'></div>
            <div style={positionObstacle} className='rover-o'></div>
          </div>
          <div className='instructions'>
            <h2> INSTRUCTIONS:</h2>
            <div className='forward-key-div'>
              <div className='key-container'>
                <img className='key' src={keyF} alt='forward'></img>
                <p>Forward</p>
              </div>
              <div className='key-container'>
                <img className='key' src={keyR} alt='right'></img>
                <p>Right</p>
              </div>
              <div className='key-container'>
                <img className='key' src={keyL} alt='left'></img>
                <p>Left</p>
              </div>
              <div className='rover-div'>
                <p className='rover-purple'></p>
                <p className='mission-instructions-text'> Continue with the mission</p>
              </div>
              <div className='rover-div'>
                <p className='rover-green'></p>
                <p className='mission-instructions-text'>Be careful, the obstacle is close!</p>
              </div>
              <div className='rover-div'>
                <p className='rover-grey'></p>
                <p className='mission-instructions-text'>Be careful, the board limit is close!</p>
              </div>
            </div>
          </div>
        </div>
        <div className='place-order-div'>
          <button onClick={handleOrderLeft} className='button-commands' type='submit'>
            Left
          </button>
          <button onClick={handleOrderForward} className='button-commands' type='submit'>
            Forward
          </button>
          <button onClick={handleOrderRight} className='button-commands' type='submit'>
            Right
          </button>
        </div>
      </>
    );
  }
}

export default App;
