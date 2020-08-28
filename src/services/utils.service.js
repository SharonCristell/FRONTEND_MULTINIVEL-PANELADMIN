import jwt from 'jsonwebtoken';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const API_URL = proxyurl + 'https://api.inresorts.club/api';

class UtilService {

    async getResidences() {
        let url = API_URL + "/country/countrieslist";
        
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

    async getTypeDocByNat(idNationality) {
        let url = API_URL + "/DocumentType/" + idNationality;
        
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

    async getPackages() {
        let url = API_URL + "/familyPackage";
        
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

    async getPackageById(id) {
        let url = API_URL + "/package/" + id ;
        
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

    // Verify code promotion
    async verifyCode(code) {

        let data = {};
        data.codPromotion = code;
        let url = API_URL + "/promotion/search";
        
        return await fetch(url, {
            method:'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });
    }
      // TODO Get Affiliation List
      async getAffiliationPendingList() {
  
        let url = API_URL + "/affilliatepending/affiliatependinglist";
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

     // TODO Get Cronograma de Pending Affiliation List
     async getScheduleAffiliationPendingList(idSuscription) {
         
        let url = API_URL + "/affilliatependingcronogram/affiliatependingcronogramlist/" + idSuscription;
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


}

export default new UtilService();