/**
 * Admin Interface
 * @interface
 */

export interface AdminData {
    fullName: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    user_image: string;
    user_uid: string;
}

