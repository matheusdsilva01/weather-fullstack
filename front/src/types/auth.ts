export type LoginPayload = {
    email: string;
    password: string;
};

export type AuthResponse = {
    access_token: string;
};

export type SignUpPayload = LoginPayload;