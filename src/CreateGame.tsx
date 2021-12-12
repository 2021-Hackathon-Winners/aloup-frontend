import { useState } from "react";
import { makeGame } from "./ServerProvider";

const CreateGame: React.FC<{onCreateGame: () => void}> = (props) =>  {
    const [stages, setStages] = useState([] as string[])
    const [vocab, setVocab] = useState([] as string[][])
    const [name, setName] = useState("")

    const parseVocab = (v: string) => {
        let iv = [] as string[][]
        const entries = v.split("\n")
        for (let entry of entries) {
            const i = entry.indexOf(" ")
            iv.push([entry.substr(0, i), entry.substr(i+1)])
        }

        setVocab(iv)
    }

    const addStage = (s: string) => {
        setStages([...stages, s])
    }

    const removeStage = (n: number) => {
        setStages(stages.filter((_, i) => i !== n))
    }

    const cGame = () => {
        makeGame(name, stages, vocab).then(() => {
            props.onCreateGame()
        })
    }

    return (
    <>
        <h1>Create Game</h1>
        <h4>Name: </h4>
        <input onChange={(event) => setName(event.target.value)} type="text" />
        <h4>Import vocab: </h4>
        <textarea onChange={(event) => parseVocab(event.target.value)}/>
        <ul>
            <button onClick={() => addStage("Seesaw")}>Seesaw</button>
            <button onClick={() => addStage("Tiles")}>Tiles</button>
            <button onClick={() => addStage("Weighted")}>Weighted</button>
        </ul>

        <h4>Stages</h4>
        <ul>
            {stages.map((s: any, i) => {
                return <li key={i} onClick={() => removeStage(i)}>{s}</li>
            })}
        </ul>

        <button onClick={() => cGame()}>Create Game</button>
    </>
    );
  }
  
export default CreateGame;