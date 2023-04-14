/* Response DTOs */

export const DTO_SUPERVISOR_RESPONSE = {
    id: Number(),
    name: String(),
    email: String(),
    doctype: String(),
    docnum: String()
};

export const DTO_SUPERVISORS_RESPONSE = {
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

export const DTO_UPDATE_SUPERVISOR_MYSQL = {
    id: Number(),
    fullname: String(),
    email: String(),
    passcode: String(),
    docnum: String()
};