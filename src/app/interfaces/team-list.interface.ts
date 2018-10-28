import { IPlayerList } from "./player-list.interface";

export interface ITeamList {
    teamName: string;
    teamId: string;
    playerList: IPlayerList[];
}