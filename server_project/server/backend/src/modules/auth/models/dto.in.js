export const DTO_LOGIN_REQUEST = {
    email: String(),
    password: String()
}

export const DTO_GET_ACCESS_TOKEN_REQUEST = {
    id: String(),
    token: String()
}

export const DTO_TOKEN_CONTENT = {
    id: Number(),
    name: String(),
    rol: String()
}

export const DTO_DELETE_REFRESH_TOKEN = {
    user: Number(),
    token: String()
}