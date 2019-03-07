import { IPlayerList } from "./player-list.interface";

export interface ISelectItem {
    label: string;
    value: string;
}


export interface ISelectedQP {
    question: string;
    selectedPlayer: IPlayerList;
}