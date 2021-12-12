import { useEffect, useState } from "react";
import { makeSession, setupTeams, startGame } from "./ServerProvider";

const GameMaster: React.FC<{game: string}> = (props) =>  {
    const [g, sg] = useState({} as any)
    const [n, sn] = useState(5)
    const [teams, steams] = useState([] as string[][])
    const [win, swin] = useState([] as string[])
    const [started, sstarted] = useState(false)

    useEffect(() => {
        makeSession(props.game, (data) => {
            if (data.name) {
                sg(data)
            }
            if (data.win) {
                swin(data.users)
            }
        })
    }, [props.game])

    const groupTeams = () => {
        setupTeams(g.code, n).then(steams)
    }

    const sGame = () => {
        startGame(g.code)
        sstarted(true)
    }

    return (
    <>
        <h1>{g.name}: {g.code}</h1>
        {win && win.length > 0 ? <h1>Winners: {win.join(", ")} </h1> : null}
        <h4># players/team: </h4>
        <input type="number" onChange={(event) => sn(+(event.target.value))} defaultValue={5} />
        { teams && teams.length > 0 ? <>{teams.map((team, i) => {
                return <ul key={i}>
                    {team.map((member, j) => {
                        return <li key={i}>{member}</li>
                    })}
                </ul>
            })}
            <button onClick={sGame} disabled={started}>Start Game</button>
            </> :
            <>
            <ul>
                {g.users?.map((user: any, i: number) => {
                    return <li key={i}>{user}</li>
                })}
            </ul>
            <button onClick={groupTeams}>Group in Teams</button>
            </>
        }
    </>
    );
  }
  
  export default GameMaster;