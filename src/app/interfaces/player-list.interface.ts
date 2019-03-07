export interface IPlayerList {
    player_id?: number;
    full_name?: string;
    short_name?: string;
    is_captain?: number;
    is_marque?: number;
    position_id?: number;
    position_name?: string;
    jersey_number?: number;
    country_id?: number;
    country_name?: string;
    gender?: string;
    jersey_no?: number;
    website?: string;
    facebook?: string;
    twitter?: string;
    google_plus?: string;
    instagram?: string;
    playerSelected?: boolean;
    playerRole?: string;
}

export interface IEventTeamDetails {
    teamId: string;
    teamName: string;
}

export interface IEventPlayerDetails {
    playerId: string;
    playerName: string;
    jerseyNumber: string;
}

export interface IEventList {
    eventName: string;
    teamDetails?: IEventTeamDetails;
    playerDetails?: IEventPlayerDetails;
    scoreline: string;
    time: string;
}
