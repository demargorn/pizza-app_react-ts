import IProfile from './user.interface';

interface IUserState {
   jwt: string | null;
   loginErrorMessage?: string;
   registerErrorMessage?: string;
   profile?: IProfile;
}

export default IUserState;
