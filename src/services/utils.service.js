import jwt from 'jsonwebtoken';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const proxyurl = "";

//const API_URL = proxyurl + 'http://45.66.156.160:60/api';
//const API_USR = proxyurl + 'http://45.66.156.160:60/api/User';
const API_URL = proxyurl + 'https://api.inresorts.club/api';
const API_USR = proxyurl + 'https://api.inresorts.club/api/User';

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

     // TODO Get Affiliation PendingList
     async getAffiliationPendingLaterList() {
  
        let url = API_URL + "/affilliatepending/affiliatependinglistToPaidLater";
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

     // TODO Get Cronograma de Quote Payment
     async getScheduleQuotePendingList(idSuscription) {
         
        let url = API_URL + "/affilliatependingcronogram/affiliatependingcronogramlistwithoutinitial/" + idSuscription;
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


    // TODO Get Tipo de Pago
    async getTipoPago(idTipoPago) {
         
        let url = API_URL + "/SubTipoPago/subtipopagolist/" + idTipoPago;
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
    async isEmailRegistered(data) {
        console.log(data)
        let url_verifydoc = API_USR + "/verifyemail";
        return await fetch(url_verifydoc, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (dataJson) {
                let flag = false;
                if (dataJson.objModel == 1) {
                    flag = true;
                }

                return flag
            })
            .catch(function (err) {
                console.error(err);
                return false;
            });
    }

    async getTypePayment() {
        let url = API_URL + "/TipoPago/listTipoPago";
        
        return await fetch(url)
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            //console.log(error);
            return undefined;
        });

    }

       // TODO Get Motivos de Rechazo

    async getDenialMotives() {
        let url = API_URL + "/membershipPayDetail/reason/";
        
        return await fetch(url)
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            //console.log(error);
            return undefined;
        });

    }

         // TODO Get Detalles de Motivos de Rechazo

         async getDenialDetailMotives(idMotive) {
            let url = API_URL + "/membershipPayDetail/reason/"+idMotive;
            
            return await fetch(url)
            .then(res => res.json())
            .then(response => {
                return response;
            })
            .catch(error => {
                //console.log(error);
                return undefined;
            });
    
        }
         // Get data user using a username

      async getUsernameSearch(parameter) {

       
        let url = API_URL + "/User/detail";
        return await fetch(url, {
            method:'POST',
            body: JSON.stringify(parameter),
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(dataJson) {
                
                //return state true or false in objmodel
                console.log(dataJson)
                return dataJson;
            })
            .catch(function(err) {
                console.error(err);
                return undefined;
            });
    }

    async getUserEditSearch(parameter) {

       
        let url = API_URL  + "/coaffiliate/usercoaffiliate";
        return await fetch(url, {
            method:'POST',
            body: JSON.stringify(parameter),
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(dataJson) {
                
                //return state true or false in objmodel
                console.log(dataJson)
                return dataJson;
            })
            .catch(function(err) {
                console.error(err);
                return undefined;
            });
    }

    async getUserEditSearch(parameter) {

       
        let url = API_URL  + "/coaffiliate/usercoaffiliate";
        return await fetch(url, {
            method:'POST',
            body: JSON.stringify(parameter),
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(dataJson) {
                
                //return state true or false in objmodel
                console.log(dataJson)
                return dataJson;
            })
            .catch(function(err) {
                console.error(err);
                return undefined;
            });
    }
     // Update Bank Account
     async updateAffiliateInfo(data) {
        console.log(data)
        let url_verifydoc = API_URL + "/coaffiliate/updateusercoaffiliate";

        return await fetch(url_verifydoc, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (dataJson) {
                return dataJson;
            })
            .catch(function (err) {
                console.error(err);
                return undefined;
            });
    }

    
      // Get send user email type using a username

      async sendEmailUsernameSearch(data) {

       
        let url = API_URL + "/membershipPayDetail/sendemail";
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
                
                //return state true or false in objmodel
                console.log(dataJson)
                return dataJson;
            })
            .catch(function(err) {
                console.error(err);
                return undefined;
            });
    }
    async saveOperation(data) {
       
        // console.log(parameter)
        let url = API_URL + "/membershipPayDetail/insertoperation";
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (dataJson) {

                //return state true or false in objmodel
                return dataJson;
            })
            .catch(function (err) {
                console.error(err);
                return undefined;
            });
    }
    async sendRegisterAutoValidator(parameter) {

       
        let url = API_URL + "/membershipPayDetail/autovalidator";
        return await fetch(url, {
            method:'POST',
            body: JSON.stringify(parameter),
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(dataJson) {
                
                //return state true or false in objmodel
                console.log(dataJson)
                return dataJson;
            })
            .catch(function(err) {
                console.error(err);
                return undefined;
            });
    }




}

export default new UtilService();