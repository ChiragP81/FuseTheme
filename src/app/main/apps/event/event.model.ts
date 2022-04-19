export interface Event {
    event_title: String;
    created_at: String;
    event_type: number | String;
    event_level: number;
    institute_uid: String;
    status: number;
}

export interface EventData {
    event_media: any;
    event_country: Country;
    event_title: String;
    created_at: {
        nanoseconds: number;
        seconds: number;
    };
    updated_at: {
        nanoseconds: number;
        seconds: number;
    };
    start_date: {
        nanoseconds: number;
        seconds: number;
    };
    end_date: {
        nanoseconds: number;
        seconds: number;
    };
    event_type: number | String;
    event_level: number;
    institute_uid: String;
    event_state: State;
    event_city: City;
    event_description: String;
    status: number;
    event_uid: string;
    user_uid: string;
}

/**
 *  Country Interface
 * @interface
 */
export interface Country {
    id: string;
    name: string;
    phonecode: string;
    sortname: string;
}

/**
 *  City Interface
 * @interface
 */
export interface City {
    id: string;
    name: string;
    state_id: string;
}

/**
 *  State Interface
 * @interface
 */
export interface State {
    country_id: string;
    id: string;
    name: string;
}

export interface User {
    status: number;
    updated_at: Date;
    user_uid: string;
}
