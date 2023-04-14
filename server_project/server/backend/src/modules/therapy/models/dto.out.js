export const DTO_ADD_THERAPY = {
    urlTherapy: String(),
    dateT: String(),
    idRelation: Number(),
    idTest: Number()
}

export const DTO_GET_NOT_FINISHED_THERAPIES = {
    id: Number(),
    url: String(),
    date: new Date(),
    test: Number(),
    state: String(),
    currentQuestion: Number()
}

export const DTO_GET_FINISHED_THERAPIES = {
    id: Number(),
    url: String(),
    date: new Date(),
    test: Number(),
    currentQuestion: Number()
}

export const DTO_THERAPY_RESPONSE = {
    id: Number(),
    test: Number()
}