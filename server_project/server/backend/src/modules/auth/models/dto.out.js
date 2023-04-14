export const DTO_AUTH_DATABASE_REGISTER = {
    token: String(),
    expire: new Date(),
    user: Number()
};

export const DTO_GET_REFRESH_TOKEN = {
    token: String(),
    user: Number()
}