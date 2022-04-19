/**
 * News interface
 */
export interface News {
    news_title: string;
    news_url: string;
    news_type: Number;
    created_at: Date;
    updated_at: Date;
    status: Number;
    news_uid: string;
    institute_uid: string;
    media_type: Number;
    news_description: string;
    news_media: string;
    share_count: Number;
    user_uid: string;
    video_thumbnail: string;
}

/**
 * News type interface
 */
export interface NewsType {
    NewsTypeID: number;
    NewsType: string;
}

/**
 * Media Type Interface
 */
export interface MediaType {
    value: Number;
    displayValue: string;
}

/**
 * Institute Interface
 * @interface
 */
export interface Institute {
    institute_uid: string;
    institute_name: string;
    status: Number;
}

/**
 * User Interface
 */
export interface User {
    first_name: string;
    last_name: string;
    user_uid: string;
    status: Number;
}

