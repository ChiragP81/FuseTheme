/**
 * Institute interface
 * @interface
 */
export interface InstituteData {
    admin_uid: String;
    contact_address: String;
    contact_email: String;
    contact_name: String;
    contact_phone: String;
    created_at: Date;
    institute_alumni_id: String;
    institute_alumni_name: String;
    institute_city: String;
    institute_description: String;
    institute_image: String;
    institute_jesuit_province: String;
    institute_motto: String;
    institute_name: String;
    institute_nation: String;
    institute_postcode: String;
    institute_province: String;
    institute_short_name: String;
    institute_uid: string;
    institute_web_url: String;
    institute_zone: String;
    status: Number;
    updated_at: Date;
    institute_managers: any;
    institute_national_officer: string;
    institute_chairman: string;
    institute_province_officer: string;
    institute_txc_champion: string;
    institute_zonal_officer: string;
    institute_president: string;
    institute_secretary: string;
    institute_super_admin: string;
}

/**
 * Institute Interface
 * @interface
 */
export interface Institute {
    institute_uid: String;
    institute_name: String;
    institute_alumni_name: String;
    institute_city: String;
    institute_province: String;
    institute_zone: String;
    institute_web_url: String;
    status: Number;
}


/**
 * Institute request interface
 */
export interface InstituteRequest {
    _id: string;
    instituteName: string;
    cityOfInstitute: string;
    alumniName: string;
    email: string;
    status: number;
}