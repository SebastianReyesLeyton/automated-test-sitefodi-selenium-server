class ResponseOBJ {

    constructor() {
        this.data = {};
        this.statusCode = 200;
    }

    json (data) {
        this.data = data;
    }

    send (data) {
        this.data = data;
    }

}

export default ResponseOBJ;