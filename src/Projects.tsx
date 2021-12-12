import { useEffect, useState } from "react";
import { getGames } from "./ServerProvider";

import './Projects.css'

const Projects: React.FC<{onCreateGame: () => void, onStartGame: (game: string) => void}> = (props) =>  {
    const [games, setGames] = useState([] as any[])

    useEffect(() => {
        getGames().then(items => {
            setGames(items)
        })
    }, [])

    return (
    <>
        <h1>Games</h1>
        <ul>
        {games.map((game: any, i) => {
            return <li key={i}>{game.name}  <button className="green" onClick={() => props.onStartGame(game.uuid)}>Play</button></li>
        })}
        </ul>
        <button onClick={props.onCreateGame}>Create a game!</button>
    </>
    );
  }
  
export default Projects;