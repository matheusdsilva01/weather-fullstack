export type LoginPayload = {
    email: string;
    name: string;
    password: string;
};

export type AuthResponse = {
    access_token: string;
};

export type SignUpPayload = LoginPayload;