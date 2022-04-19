export interface Txclusive {
    txclusive_title: string;
    start_date: string;
    end_date: string;
    txclusive_type: number | string;
    txclusive_level: number;
    institute_uid: string;
    status: number;
}

export interface TxclusiveData {
    txclusive_media: any;
    txclusive_title: String;
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
    txclusive_type: number | String;
    txclusive_level: number;
    institute_uid: String;
    txclusive_description: String;
    status: number;
    txclusive_uid: string;
    user_uid: string;
}

export interface User {
    status: number;
    updated_at: Date;
    user_uid: string;
}

