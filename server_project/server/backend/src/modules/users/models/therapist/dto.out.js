/* Response DTOs */

export const DTO_THERAPIST_RESPONSE = {
    id: Number(),
    name: String(),
    email: String(),
    doctype: String(),
    docnum: String()
};

export const DTO_THERAPISTS_RESPONSE = {
    id: Number(),
    name: String(),
    email: String(),
    docnum: String(),
    active: String()
};

/* MySQL DTOs */

export const DTO_REGISTER_MYSQL = {
    fullname: String(),
    email: String(),
    passcode: String(),
    docnum: String()
};

export const DTO_UPDATE_THERAPIST_MYSQL = {
    id: Number(),
    fullname: String(),
    email: String(),
    passcode: String(),
    docnum: String()
};

export const DTO_THERAPIST_MYSQL_RELATION = {
    idTherapist: Number(),
    idPatient: Number()
}