  export class Athlete {
    id: number;
    resource_state: number;
  }

  export class Map {
    id: string;
    summary_polyline: string;
    resource_state: number;
  }

  export class Activity {
    id: number;
    resource_state: number;
    external_id: string;
    upload_id: number;
    athlete: Athlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    start_date: Date;
    start_date_local: Date;
    timezone: string;
    start_latlng: number[];
    end_latlng: number[];
    achievement_count: number;
    pr_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    total_photo_count: number;
    map: Map;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    flagged: boolean;
    average_speed: number;
    max_speed: number;
    average_watts: number;
    max_watts: number;
    weighted_average_watts: number;
    kilojoules: number;
    device_watts: boolean;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
  }



