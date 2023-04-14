export const DTO_REGISTER_THERAPIST = {
    name: String(),
    email: String(),
    password: String(),
    docnum: String()
};

export const DTO_UPDATE_THERAPIST = {
    id: String(),
    name: String(),
    email: String(),
    newPassword: String(),
    docnum: String()
};