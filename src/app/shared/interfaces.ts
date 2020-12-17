export interface User {
    email: string;
    password: string;
}

export interface Product {
    name: string;
    id?: string;
    text: string;
    category: string;
    user_id?: string;
}

export interface FbCreateResponse {
    name: string;
}
