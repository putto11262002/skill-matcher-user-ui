export const NOT_ALLOWED_UPDATE = [
  'password',
  'email',
  'username',
  'role',
  'refreshToken'
];

export const NOT_ALLOWED_SELF_UPDATE = [];

export const ONLY_ADMIN_SEARCH_FIELDS = [];

export const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
};

export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  ROOT: 'root',
};

export const USER_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};
export const USER_AVATAR_MAX_SIZE = 5242880;
export const USER_AVATAR_HEIGHT = 180;
export const USER_AVATAR_WIDTH = 180;

export const PUBLIC_RESPONSE_OMIT_FIELDS = [
  'profile.facebook',
  'profile.instagram',
  'profile.snapchat',
  'email',
  'profile.contactEmail',
  'profile.phoneNumber'
];


export const USER_EVENT = {
  DELETED: 'user_deleted'
}