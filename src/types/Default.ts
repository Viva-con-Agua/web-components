export interface Modified {
    created: number;
    updated: number;
}

export interface DropdownOption {
    label: string;
    value: string;
}

export interface Url {
    id: string;
    title: string;
    url: string;
}

export interface Role {
    name: string;
    label: string;
    user_id: string;
}

export interface Money {
    amount: number;
    currency: string;
}

export enum ColorType {
    default = 'default',
    dark = 'dark',
    orange = 'orange',
    aguaPink = 'agua-pink',
}
