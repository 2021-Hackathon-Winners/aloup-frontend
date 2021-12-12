
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { joinSession, Room, ROOM_WIDTH, StageData, STAGE_HEIGHT, updatePosition } from './ServerProvider';
import './Signin.css';

let room: Room;

const Game: React.FC = () =>  {
    const [em, sem] = useState("")
    const [code, sCode] = useState("")
    const [nickname, sNickname] = useState("")
    const [mode, sMode] = useState("entry")
    const [stageData, ssd] = useState([] as StageData[])
    // const [room, sRoom] = useState({} as Room)
    const [win, swin] = useState([] as string[])

    const joinGame = () => {
        if (nickname === "" || code === "") {
            sem("Please enter a nickname or code")
            return
        }
        joinSession(code, nickname, (data) => {
            if (data.success) {
                sMode("waiting")
                ssd(data.stageData)
            } else if (data.error) {
                sem("Not a valid code or nickname")
            } else if (data.session) {
                setKeyboardStart()
                room = data
            } else if (data.start) {
                setKeyboardStart()
                sMode("game")
            } else if (data.win) {
                swin(data.users)
            }
        })
    }

    const cb = (e: KeyboardEvent) => {
        console.log(room)
        if (!room) {return}
        if (!room.users) {return}
        const pos = room.users.find(user => user[0].name === nickname)?.[1]
        const xval = room.currentStage * STAGE_HEIGHT
        if (!pos) {return}
        if (e.key === 'ArrowUp') {
            // up arrow
            if (pos.x > xval) {
                return
            }
            pos.x += 1
            
        }
        else if (e.key === 'ArrowDown') {
            // down arrow
            if (pos.x < 0) {
                return
            }
            pos.x -= 1
            
        }
        else if (e.key === 'ArrowLeft') {
           // left arrow
           if (pos.y < 0) {
            return
        }
           pos.y -= 1
           
        }
        else if (e.key === 'ArrowRight') {
           // right arrow
            if (pos.y > ROOM_WIDTH) {
                return
            }
           pos.y += 1
          
        }

        console.log(pos)
        updatePosition(room.id, nickname, pos)
    }
    document.addEventListener("keydown", cb)

    const setKeyboardStart = () => {
        
    }

    return (
    <>
        {(() => {
            switch (mode) {
                case "entry": return <>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Game code:</h1>
                    <input onChange={(event) => sCode(event.target.value)} type="text" /> 
                    <h1>Nickname: </h1>
                    <input onChange={(event) => sNickname(event.target.value)} type="text" /> 
                    <button onClick={joinGame}>Join Game</button>
                    <p className="errorMessage">{em}</p>
                </>
                case "waiting": return <h1>Waiting for start ({code}) <p>{JSON.stringify(stageData)}</p></h1>
                case "game": return <>
                    <p>{JSON.stringify(stageData)}</p>
                    <p>{JSON.stringify(room)}</p>
                </>
                case "win": return <h1>Winners: {win.join(", ")} </h1>
            }
        })()}
    </>
    );
  }
  
  export default Game;