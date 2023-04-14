export const DTO_REGISTER = {
    name: String(),
    email: String(),
    password: String(),
    docnum: String(),
    doctype: String(),
    gender: String(),
    leftHAID: String(),
    rightHAID: String(),
    dateofBirth: String()
}

export const DTO_UPDATE_PATIENT = {
    id: String(),
    name: String(),
    email: String(),
    newPassword: String(),
    docnum: String(),
    doctype: String(),
    gender: String(),
    leftHAID: String(),
    rightHAID: String(),
    dateofBirth: String()
}

export const DTO_GET_RELATION = {
    patient: String()
}