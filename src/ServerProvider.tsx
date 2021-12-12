import { add } from './Serverconn'

export const ROOM_WIDTH = 100
export const STAGE_HEIGHT = 100

export interface StageData {
    stageName: string,
    term: string,
    options: string[],
    correctOption: number
}

export enum StageType {
    WEIGHTED = "Weighted",
    SEESAW = "Seesaw",
    TILES = "Tiles"
}

export type Position = {
    x: number,
    y: number
}

export type Room = {
    users: [{name: string}, Position][],
    session: string,
    currentStage: number,
    id: string
}

function creator<T>(request: string, data: any = {}, inner: string = "") {
    let simple: T extends boolean ? true : false
    data.request = request
    return new Promise<T>((res, rej) => {
        add(data, (data) => {
            if (data.error) {
                rej(data.error)
            } else {
                if (simple) {
                    res(true as any)
                } else {
                    if (inner) {
                        res(data[inner])
                    } else {
                        res(data)
                    }
                }
            }
        })
    })
}

export const auth = (token: string) => creator<string>("auth", {token}, "auth")
export const getSelf = () => creator<any>("getSelf")
export const getGames = () => creator<any[]>("getGames", {}, "items")
export const makeGame = (name: string, stages: string[], dict: string[][]) => creator<boolean>("makeGame", {name, stages, dict})
export const makeSession = (game: string, callback: (data: any) => void) => add({request: "makeSession", game}, callback)
export const joinSession = (code: string, nickname: string, callback: (data: any) => void) => add({request: "joinSession", code, nickname}, callback)
export const setupTeams = (code: string, number: number) => creator<string[][]>("setupTeams", {code, number}, "teams")
export const startGame = (code: string) => creator<boolean>("startGame", {code})
export const updatePosition = (roomID: string, nickname: string, position: Position) => add({request: "updatePosition", roomID, nickname, position}, () => {})