const axios = require('axios');

class Requests {
    constructor(item) {
        item = this.item;
    }

    //GET request
    getRequest(item) {
        axios
            .get(`http://localhost:3001/api/${item}`)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    //POST request ======================= Needs a body to post
    postRequest(item, subitem, body) {
        axios
            .post(`http://localhost:3001/api/${item}/${subitem}`, body)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    //PUT request  ========================= might need some sort of body or something?
    putRequest(item, subitem) {
        axios
            .put(`http://localhost:3001/api/${item}/${subitem}`)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res);
            })
            .catch(error => {
                console.error(error);
            });
    };

}
module.exports = Requests;