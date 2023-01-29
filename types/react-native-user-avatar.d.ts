// Required since the library does not have an @types
import * as UserAvatarTypes from 'react-native-user-avatar/types';

declare module 'react-native-user-avatar' {
  export const UserAvatar: UserAvatarTypes;
}
