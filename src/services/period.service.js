import jwt from 'jsonwebtoken';

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const proxyurl = "";

// const API_URL = proxyurl + 'http://45.66.156.160:60/api';

const API_URL = proxyurl + 'https://api.inresorts.club/api';

class PeriodService {

    async getPeriod() {
        let url = API_URL + "/period";
        
        return await fetch(url)
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });

    }
    
    async createPeriod(data) {
        let url = API_URL + "/period/insert";
       
        return await fetch(url, {
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(dataJson) {
            
            return dataJson;
        })
        .catch(function(err) {
            console.error(err);
            return false;
        });

    }

    
    async updatePeriod(data) {
        let url = API_URL + "/period/update";
       
        return await fetch(url, {
        method:'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(dataJson) {
            
            return dataJson;
        })
        .catch(function(err) {
            console.error(err);
            return false;
        });

    }
}

export default new PeriodService();