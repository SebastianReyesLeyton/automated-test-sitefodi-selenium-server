/* Response DTOs */

export const DTO_PATIENT_RESPONSE = {
    id: Number(),
    name: String(),
    email: String(),
    docnum: String(),
    doctype: String(),
    gender: String(),
    leftHAID: String(),
    rightHAID: String(),
    dateofBirth: new Date()
}

export const DTO_PATIENTS_RESPONSE = {
    id: Number(),
    name: String(),
    email: String(),
    docnum: String(),
    gender: String(),
    active: String(),
    relation: Number()
}

/* MySQL DTOs */

export const DTO_REGISTER_MYSQL = {
    fullname: String(),
    email: String(),
    passcode: String(),
    docnum: String(),
    doctype: Number(),
    gender: String(),
    leftHAID: String(),
    rightHAID: String(),
    dateofBirth: String()
}

export const DTO_UPDATE_PATIENT_MYSQL = {
    id: Number(),
    fullname: String(),
    email: String(),
    passcode: String(),
    docnum: String(),
    doctype: Number(),
    gender: String(),
    leftHAID: String(),
    rightHAID: String(),
    dateofBirth: String()
}