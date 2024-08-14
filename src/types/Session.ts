import { Modified, Role } from './Default';

export interface SessionUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    display_name: string;
    country: string;
    private_policy: boolean;
    system_roles: Role[];
    confirmed: boolean;
    last_update: string;
    modified: Modified;
}
