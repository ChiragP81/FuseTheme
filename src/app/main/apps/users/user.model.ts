/**
 *  Institute Interface
 * @interface
 */
export interface Institute {
    batch_year: Number;
    institute_name: String;
    institute_province: String;
    institute_uid: String;
    institute_zone: String;
    verify_status: number;
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
 *  State Interface
 * @interface
 */
export interface State {
    country_id: string;
    id: string;
    name: string;
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
 *  User Interface
 * @interface
 */
export interface User {
    first_name: String;
    last_name: String;
    email: String;
    dob: Date;
    like_connect_for: any;
    institutes: Institute[];
    phone: Number | String;
    country: Country;
    state: State;
    city: City;
    user_uid: string;
    is_verified: boolean;
}
