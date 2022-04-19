import { environment } from '../../environments/environment';

export class Constants {
    public static siteName = 'TXC';
    public static baseURL = environment.general_const.BASE_URL;
    public static DELAY = 1000;
    // public static BASE_URL = 'http://xaviers.online/backend/';
    public static BASE_URL = 'http://localhost:4200/';
    public static no_img_path = 9;
    public static image_types_array = ['jpg', 'png', 'gif'];
    public static video_types_array = ['mp4'];
    public static urlPattern = new RegExp(
        '((http|https)(://))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(/{1}[a-zA-Z0-9]+)*/?',
        'i',
    );

    public static super_admin_user_type = 9;

    public static video_size = 20;
    public static image_size = 2;
    public static pass_length = 6;
    public static max_pass_length = 10;
    public static pagination = 5;
    public static loader_timeout = 100;
    public static msg_loader_time = 100;
    public static STATIC_NAME = 'No User Available';
    public static STATIC_IMG_URL =
        'https://firebasestorage.googleapis.com/v0/b/xaviers-connect.appspot.com/o/uploads%2Fusers%2FBadges2.png?alt=media&token=9f926e2b-9a20-40fd-908b-6110be3eb0a3';
    public static const_user_types = {
        Chairman: 1,
        President: 2,
        Secretary: 3,
        TXC_Champion: 4,
        Province_Officer: 5,
        Zonal_Officer: 6,
        National_Officer: 7,
    };
    public static const_affiliate_ad = {
        Manage_Affiliate_Advert: 'Manage Affiliate Advert',
        Affiliate_Advert_List: 'Affiliate Advert List',
        Create_Affiliate_Advert: 'Create Affiliate Advert',
        Edit_Affiliate_Advert: 'Edit Affiliate Advert',
        Affiliate_Advert: 'Affiliate Advert',
    };

    public static const_status = {
        Active: 'Active',
        In_Active: 'In-Active',
    };

    public static const_news_type = {
        General: 'General',
        Private: 'Private',
    };

    public static approve_status = [
        {
            value: '',
            displayValue: 'All',
        },
        {
            value: true,
            displayValue: 'Verified',
        },
        {
            value: false,
            displayValue: 'Pending',
        },
    ];

    public static status = [
        {
            value: null,
            displayValue: 'Select all'
        },
        {
            value: 0,
            displayValue: 'Inactive',
        },
        {
            value: 1,
            displayValue: 'Active',
        },
        {
            value: 2,
            displayValue: 'Block',
        },
        {
            value: 3,
            displayValue: 'Deleted',
        },
        {
            value: 4,
            displayValue: 'Draft',
        },
    ];

    public static news_type = [
        {
            NewsTypeID: 0,
            NewsType: 'General',
        },
        {
            NewsTypeID: 1,
            NewsType: 'Private',
        },
    ];

    public static institute_status = [
        {
            value: null,
            displayValue: 'Select all'
        },
        {
            value: 0,
            displayValue: 'Inactive',
        },
        {
            value: 1,
            displayValue: 'Active',
        },
    ];

    public static const_admin_titles = {
        manage_admin: 'Manage Admin',
        manage_admin_list: 'Admin List',
        edit_admin: 'Edit Admin',
    };
    public static const_user_titles = {
        manage_user: 'Manage User',
        manage_user_list: 'User List',
        manage_user_view: 'View User',
    };
    public static const_event_titles = {
        manage_event: 'Manage Event',
        manage_event_list: 'Event List',
        manage_event_view: 'View Event',
    };
    public static const_Event_level = [
        {
            value: 0,
            displayValue: 'Institute',
        },
        {
            value: 1,
            displayValue: 'Province',
        },
        {
            value: 2,
            displayValue: 'Zone',
        },
        {
            value: 3,
            displayValue: 'National',
        },
    ];

    public static const_Event_type = [
        {
            value: 0,
            displayValue: 'offline',
        },
        {
            value: 1,
            displayValue: 'online',
        },
    ];

    public static const_Event_status = [
        {
            value: null,
            displayValue: 'Select all',
        },

        {
            value: 0,
            displayValue: 'DisApprove',
        },
        {
            value: 1,
            displayValue: 'Approve',
        },
    ];
    public static const_institute_titles = {
        manage_institute: 'Manage Institute',
        manage_institute_list: 'Institute List',
        manage_institute_add: 'Add Institute',
        manage_institute_edit: 'Edit Institute',
        manage_institute_role: 'Manage Role',
        manage_institute_request: 'Institute Request',
    };
    public static const_institute_users = [
        {
            user_type: 1,
            user_view_value: 'Chairman',
            user_type_key: 'institute_chairman',
        },
        {
            user_type: 2,
            user_view_value: 'President',
            user_type_key: 'institute_president',
        },
        {
            user_type: 3,
            user_view_value: 'Secretary',
            user_type_key: 'institute_secretary',
        },
        {
            user_type: 4,
            user_view_value: 'TXC-Champion',
            user_type_key: 'institute_txc_champion',
        },
        {
            user_type: 5,
            user_view_value: 'Province Officer',
            user_type_key: 'institute_province_officer',
        },
        {
            user_type: 6,
            user_view_value: 'Zonal Officer',
            user_type_key: 'institute_zonal_officer',
        },
        {
            user_type: 7,
            user_view_value: 'National officer',
            user_type_key: 'institute_national_officer',
        },
        {
            user_type: 8,
            user_view_value: 'Super Admin',
            user_type_key: 'institute_super_admin',
        },
    ];
    public static const_news_titles = {
        manage_news: 'Manage News',
        manage_news_list: 'News List',
        manage_news_add: 'Add News',
        manage_news_edit: 'Edit News',
    };

    public static news_media_type = [
        {
            value: 0,
            displayValue: 'Image',
        },
        {
            value: 1,
            displayValue: 'Video',
        },
    ];

    public static news_status = [
        {
            value: null,
            displayValue: 'Select all'
        },
        {
            value: 0,
            displayValue: 'Inactive',
        },
        {
            value: 1,
            displayValue: 'Active',
        },
    ];
    public static const_trivias_titles = {
        manage_trivia: 'Manage Trivia',
        manage_trivia_list: 'Trivias',
        manage_trivia_add: 'Add Trivia',
    };
    public static const_trivia_type = [
        {
            trivia_type: 0,
            trivia_type_value: 'Quiz',
        },
        {
            trivia_type: 1,
            trivia_type_value: 'Poll',
        },
        {
            trivia_type: 2,
            trivia_type_value: 'Quotes',
        },
    ];
    public static trivia_status = [
           {
            value: null,
            displayValue: 'Select all'
        },
        {
            value: 0,
            displayValue: 'Inactive',
        },
        {
            value: 1,
            displayValue: 'Active',
        },
    ];

    public static admin_status = [
        {
         value: null,
         displayValue: 'Select all'
     },
     {
         value: 0,
         displayValue: 'Inactive',
     },
     {
         value: 1,
         displayValue: 'Active',
     },
 ];

 public static const_Txclusive_level = [
    {
        value: 0,
        displayValue: 'Institute',
    },
    {
        value: 1,
        displayValue: 'Province',
    },
    {
        value: 2,
        displayValue: 'Zone',
    },
    {
        value: 3,
        displayValue: 'National',
    },
    {
        value: 4,
        displayValue: 'National',
    },
];

public static const_Txclusive_type = [
    {
        value: 0,
        displayValue: 'offline',
    },
    {
        value: 1,
        displayValue: 'online',
    },
    {
        value: 2,
        displayValue: 'private',
    },
    {
        value: 3,
        displayValue: 'public',
    },
];

public static txclusive_status = [
    {
        value: null,
        displayValue: 'Select all'
    },
    {
        value: 0,
        displayValue: 'DisApprove',
    },
    {
        value: 1,
        displayValue: 'Approve',
    },
];

public static const_txclusive_titles = {
    manage_txclusive: 'Manage Txclusive',
    manage_txclusive_list: 'Txclusive List',
    manage_txclusive_view: 'View Txclusive',
};

}

export class TblConstant {
    public static recent_users = 6;
    public static users_tbl = 'accounts';
    public static announcements_tbl = 'announcements';
    public static events_tbl = 'events';
    public static news_tbl = 'news';
    public static txc_users_tbl = 'users';
    public static txc_institute_tbl = 'institutes';
    public static institute_request_tbl = 'newInstitutes';
    public static trivia_tbl = 'trivia';
}

export class GeneralMsg {
    public static admin_create = 'Admin is successfully created.';
    public static super_admin_create = 'Super admin is successfully created.';
    public static super_admin_update = 'Super admin is successfully updated.';
    public static admin_delete = 'Admin is successfully deleted.';
    public static image_validation = 'image Type invalide.';
    public static announcement_create = 'Announcement is successfully created.';
    public static announcement_update = 'Announcement is successfully updated.';
    public static announcement_delete = 'Announcement is successfully deleted.';
    public static event_create = 'Event is successfully updated.';
    public static event_update = 'Event is successfully updated.';
    public static event_delete = 'Event is successfully deleted.';
    public static event_approve = 'Event has been approved successfully.';
    public static event_disapprove = 'Event has been disapproved successfully.';
    public static txclusive_approve = 'Txclusive has been approved successfully.';
    public static txclusive_disapprove = 'Txclusive has been disapproved successfully.';
    public static institute_create = 'Institute is successfully created.';
    public static institute_update = 'Institute is successfully updated.';
    public static institute_delete = 'Institute is successfully deleted.';
    public static institute_approve =
        'Institute has been approved successfully.';
    public static institute_disapprove =
        'Institute has been disapproved successfully.';
    public static institute_request_delete =
        'Institute request has been deleted successfully.';
    public static message_create = 'Message is successfully created.';
    public static message_update = 'Message is successfully updated.';
    public static news_create = 'News is successfully created.';
    public static news_update = 'News is successfully updated.';
    public static news_delete = 'News is successfully deleted.';
    public static banner_create = 'Banner is successfully updated.';
    public static banner_update = 'Banner is successfully updated.';
    public static banner_delete = 'Banner is successfully deleted.';
    public static reset_link =
        'Password reset link has been sent to your account, Please check your account.';
    public static login_msg = 'You have successfully logged in!';
    public static logout_msg = 'You have successfully logged out!';
    public static admin_update = 'Admin is successfully updated.';
    public static admin_avatar_upload = 'Admin Avatar successfully updated.';
    public static trivia_create = 'Trivia is successfully created.';
}
export class GeneralError {
    public static inactive_account =
        'Your account is Inactive, Please contact administrator.';
    public static email_validate = 'Please enter proper email address.';
    public static phone_validate = 'Please enter proper phone number.';
    public static confirm_password_validate =
        'Confirm password should be same as password.';
    public static weburl_validate = 'Please enter proper web url.';
    public static password_length_validate =
        'Minimum 6 character password required.';
    public static password_max_length_validate =
        'Maximum 10 character password required.';
    public static form_validate = 'Please enter all mandatory fields.';
    public static image_type_validate = 'Please select proper image type.';
    public static image_size_validate =
        'Image size exceeds 2 MB, Please select less than 2 MB.';
    public static video_type_validate = 'Please select mp4 video type.';
    public static video_size_validate =
        'Video size exceeds 20 MB, Please select less than 20 MB.';
    public static email_exist_validate = 'Admin Email already exist.';
    public static email_phone_validate = 'Admin Phone already exist.';
    public static admin_notexist = 'Admin is not exist.';
    public static no_image_validate = 'Please select image.';
    public static video_validate = 'Please select proper video.';
    public static image_validate = 'Please select proper image.';
    public static announcement_notexist = 'Announcement is not exist.';
    public static event_notexist = 'Event is not exist.';
    public static txclusive_notexist = 'Txclusive is not exist.';
    public static institute_notexist = 'Institute is not exist.';
    public static institute_notadmin =
        'No admin is available for the institute.Please add institute admins.';
    public static message_notexist = 'Message is not exist.';
    public static news_notexist = 'News is not exist.';
    public static user_notexist = 'User is not exist.';
    public static banner_notexist = 'Banner is not exist.';
    public static no_permission = 'You don`t have permission to access.';
    public static general_error_msg = 'something went wrong.';
    public static image_upload_error =
        'Something went wrong while uploading image.';
    public static no_assignment_users = 'No users found to assign role';
    public static news_url_validate = 'Please enter proper news url.';
    public static no_media_validate = 'Please select news media.';
    public static news_media_upload_err =
        'Something went wrong while uploading news media.';
    public static news_thumb_upload_err =
        'Something went wrong while uploading media thumbnail.';
}
export class AdvertToasterMessage {
    public static advertSucess = 'Success';
    public static errorAdvert = 'Banner is Successfully Updated.';
}

/**
 * Status Interface for admin_status , user_status & institute_status
 * @interface
 */
export interface Status {
    value: number;
    displayValue: string;
}
