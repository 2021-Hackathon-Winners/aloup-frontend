import React, { useState } from 'react';
import './App.css';
import Signin from './Signin';
import Mode from './Mode';
import Game from './Game';
import Projects from './Projects';
import CreateGame from './CreateGame';
import GameMaster from './GameMaster';

function App() {
  const [currentPage, scp] = useState("mode")
  const [game, sgame] = useState("")

  const onSignin = (a: string) => {
    scp("projects")
  }

  const onMode = (a: string) => {
    scp(a)
  }

  const onCreateGame = () => {
    scp("gamecreate")
  }

  const onStartGame = (game: string) => {
    sgame(game)
    scp("gamemaster")
  }
  
  return (
    <div className="App">
      <header className="App-header">
      {(() => {
          switch (currentPage) {
            case "gm": return <Signin onSignin={onSignin} />
            case "mode": return <Mode onMode={onMode} />
            case "player": return <Game />
            case "projects": return <Projects onCreateGame={onCreateGame} onStartGame={onStartGame} />
            case "gamecreate": return <CreateGame onCreateGame={() => scp("projects")} />
            case "gamemaster": return <GameMaster game={game} />
          }
        })()}
      </header>
    </div>
  );
}

export default App;
