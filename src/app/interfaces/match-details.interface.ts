export interface IMatchDetails {
    event_status_id?: string;
    series_name?: string;
    game_id?: string;
    event_state?: string;
    event_status?: string;
    tour_id?: string;
    event_stage?: string;
    league_code?: string;
    event_sub_status?: string;
    result_code?: string;
    sport?: string;
    participants?: IParticipants[];
    event_name?: string;
    event_visible?: string;
    start_date?: string;
    venue_id?: string;
    result_sub_code?: string;
    tour_name?: string;
    event_livecoverage?: string;
    winning_margin?: string;
    venue_name?: string;
    end_date?: string;
    event_islinkable?: string;
    event_format?: string;
    event_group?: string;
    series_id?: string;
}

export interface IParticipants {
    name?: string;
    short_name?: string;
    id?: string;
    value?: string;
    players_involved?: IPlayersInvolved[];
}

export interface IPlayersInvolved {
    playerName?: string;
    role?: string;
    jerseyNumber?: number;
}
