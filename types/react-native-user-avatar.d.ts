// Required since the library does not have an @types
import UserAvatarPropsType from 'react-native-user-avatar/types';

declare module 'react-native-user-avatar' {
  export const UserAvatar: UserAvatarPropsType;
}
