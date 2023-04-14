export const DTO_MYSQL_TEST_CREATION = {
    tName: String(),
    tDescription: String()
};

export const DTO_TESTS_RESPONSE = {
    id: Number(),
    name: String(),
    description: String()
};

export const DTO_TEST_RESPONSE = {
    id: Number(),
    name: String(),
    description: String()
};

export const DTO_QUESTION_TYPES_RESPONSE = {
    id: Number(),
    type: String(),
    description: String()
};

export const DTO_MYSQL_GENERAL_QUESTION = {
    idtype: Number()
};

/* Questions */

export const DTO_ADD_CARD_QUESTION_MYSQL = {
    id: Number(),
    therapistTitle: String(),
    patientTitle: String(),
    cardnameT: String(),
    cardnameP: String(),
    img: Number(),
    yesValue: Number(),
    noValue: Number()
};

export const DTO_TEST_QUESTIONS_RESPONSE = {
    test: Number(),
    question: Number(),
    type: String(),
    order: Number()
}