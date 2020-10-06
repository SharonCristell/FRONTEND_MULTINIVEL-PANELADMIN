import authHeader from './auth-header';
import AuthService from './auth.service';

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

const proxyurl = "";
const  API_URL = proxyurl + 'http://45.66.156.160:60/api/';
const API_USR = proxyurl + 'http://45.66.156.160:60/api/User';
//const  API_URL = proxyurl + 'https://api.inresorts.club/api/';
//const API_USR = proxyurl + 'https://api.inresorts.club/api/User';


class UserService {
    
    async updateInfo(id, data) {
        let url_update = API_USR + "/" + "edituserprofile/" + id;
        let user = AuthService.getCurrentUser();

        return await fetch(url_update, {
            method:'PATCH',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.access_Token}` 
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            if(response.access_Token !== null) {
                let idUser = AuthService.getCurrentIdUser();
                AuthService.getUserInformation(idUser);
            }
            return response;
            
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });
    }

    // TODO change id 
    async getResidualTree() {
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "tree/residual/" + id;
        let user = AuthService.getCurrentUser();

        // {
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Authorization': `Bearer ${user.access_Token}` 
        //     }
        // }
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

    async getPatrocinioTree() {
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "tree/Affiliate/" + id;
        let user = AuthService.getCurrentUser();

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

    // TODO Get Schedule
    async getSuscription() {
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "suscription/user/" + id;
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
    
    // TODO Get Schedule
    async getSchedule(idSuscription) {
        console.log("schedule");
        let url = API_URL + "membershipPayDetail/schedule/" + idSuscription;
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

    
    async getUpLiner(id) {
        
        let url = API_URL + "tree/placement/upliners/" + id;
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

    // TODO Get sponsors
    async getSponsors() {
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "coaffiliate/sponsoredList/" + id;
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

    // TODO 
    async getActivations() {
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "suscription/user/" + id;
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
    // TODO
    async getDashBoard() {
        console.log("er");
        let id = AuthService.getCurrentIdUser();
        let url = API_URL + "dashboard/profile/" + id;
        return await fetch(url)
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });
        // let stringJson = {
        //     "status": 1,
        //     "description": "Transaction Sucessfully",
        //     "objModel": {
        //         "user": {
        //             "id": 1,
        //             "name": "Omar Testing MOD",
        //             "lastname": "Apellidos1",
        //             "birthdate": "2020-07-10T16:54:15.17",
        //             "gender": "M",
        //             "idNationality": 1,
        //             "idDocument": 0,
        //             "nroDocument": "1",
        //             "civilState": "soltero",
        //             "email": "a@a.com",
        //             "idResidenceCountry": 1,
        //             "districtAddress": "Lince",
        //             "address": "av cesar vallejo",
        //             "username": "utest",
        //             "password": "",
        //             "nroTelf": null,
        //             "boolDelete": 0
        //         },
        //         "coAffiliate": {
        //             "id": 7,
        //             "name": "Ms Selena",
        //             "lastname": "Gomez",
        //             "idDocument": 1,
        //             "birthdate": "2020-07-10T00:00:00",
        //             "nroDocument": "1111",
        //             "idUser": 1
        //         },
        //         "dashboard": {
        //             "numSocios": 2,
        //             "state": 1,
        //             "stateText": "Activo",
        //             "cycleEmpresa": {
        //                 "idCycle": 2,
        //                 "startDate": "2020-07-29T00:00:00",
        //                 "endDate": "2020-08-14T00:00:00",
        //                 "creationDate": "2020-07-29T00:00:00",
        //                 "diasRestantes": 10
        //             },
        //             "cycleUser": {
        //                 "idCycle": 0,
        //                 "startDate": "2020-08-01T00:00:00",
        //                 "endDate": "2020-08-07T00:00:00",
        //                 "creationDate": "2020-08-04T15:28:29.0215438-05:00",
        //                 "diasRestantes": 3
        //             },
        //             "activoHasta": "0001-02-01T00:00:00",
        //             "fechaUltimoPago": "0001-01-01T00:00:00",
        //             "puntsTotalesPendientes": 0,
        //             "puntsDirectosPendientes": 0,
        //             "rangoMaximo": "Socio",
        //             "rangoActual": "Socio",
        //             "proxRange": {
        //                 "idRange": 2,
        //                 "name": "Plata",
        //                 "descripcion": null,
        //                 "points": 340.00,
        //                 "award": 0.00,
        //                 "maintenance": 0.00,
        //                 "directPartners": 2,
        //                 "minPartners": 3,
        //                 "requiredRanges": 0,
        //                 "requiredCode": "",
        //                 "code": "PLT",
        //                 "scopeAfil": 4,
        //                 "scopeResid": 1,
        //                 "bAuto": 0.66,
        //                 "fkRange": 0,
        //                 "position": 2,
        //                 "amountMaintenance": 33.00,
        //                 "pointsRequired": 1.00,
        //                 "pointsRequiredd": 1.00,
        //                 "pointsRequireddd": 1.00,
        //                 "pointsRequiredddd": 1.00,
        //                 "pointminimo": 0,
        //                 "pointmaximo": 180,
        //                 "porcentajeminimo": 0,
        //                 "porcentajeMaximo": 0,
        //                 "lineasactivas": 2,
        //                 "puntosminimosDirectos": 90,
        //                 "volumenRango": 270,
        //                 "requeriments": null
        //             },
        //             "puntsTotalRamesPatrocinio": [
        //                 {
        //                     "codigo": 1,
        //                     "totalRama": 65.00,
        //                     "name": "Rama 1"
        //                 },
        //                 {
        //                     "codigo": 2,
        //                     "totalRama": 0.00,
        //                     "name": "Rama 2"
        //                 },
        //                 {
        //                     "codigo": 3,
        //                     "totalRama": 0.00,
        //                     "name": "Rama 3"
        //                 }
        //             ],
        //             "volumeTotal": 65.00,
        //             "puntsRamesCompuesto": null,
        //             "puntsRamesResidual": null
        //         }
        //     }
        // };

        // return JSON.parse(stringJson);
    }

     getInformationAccount(){
      let url_account = API_URL + "account";
      let ac ={
        accountSoles: "2323 1234 1234",
        accountInterSoles: "2314 5678 3214",
        accountDolars: "4321 3576 1234",
        accountInterDolars: "3254 7678 4509",
      };
      return ac;
      // return await fetch(url_account
      // })
      // .then(res => res.json())
      // .then(response => {
      //     console.log(response);
      //     if(response.access_Token !== null) {
      //         sessionStorage.setItem("user",  JSON.stringify(response));
      //         sessionStorage.setItem("islogged", true);
      //     }
      //     return response;
        
      // })
      // .catch(error => {
      //     console.log(error);
      //     return undefined;
      // });
    }

    async isDocumentRegistered(data) {
        console.log(data)
        let url_verifydoc = API_USR + "/verifydocument";
        return await fetch(url_verifydoc, {
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
            return dataJson.objModel;
        })
        .catch(function(err) {
            console.error(err);
            return false;
        });
    }

    //recover password
    async recoverPassword(data) {
        let url_verifydoc = API_USR + "/User/ExecuteRecovery";
        let isRegister = await fetch(url_verifydoc, {
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
              return undefined;
          });
    }

    // Register user
    async registerUser(data) {

        let url= API_URL + "/register/insert";
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
              return undefined;
          });
    }

    // Accept Payment

    async acceptPayment(data) {


        //let url= API_URL + "schedule/update";

        let url= API_URL + "membershipPayDetail/acceptpayment";

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
              return undefined;
          });
    }

    // Reject Payment

    async rejectPayment(data) {


        //let url= API_URL + "schedule/update";

        let url= API_URL + "membershipPayDetail/declinepayment";

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
              return undefined;
          });
    }

       // Accept List Payment

       async acceptListPayment(data) {


        //let url= API_URL + "schedule/update";

        let url= API_URL + "membershipPayDetail/acceptpayments";

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
              return undefined;
          });
    }

    // Reject List Payment

    async rejectListPayment(data) {


        //let url= API_URL + "schedule/update";

        let url= API_URL + "membershipPayDetail/declinepayments";

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
              return undefined;
          });
    }

    /**
     * Services for editor of user's schedule - only one schedules
     */
    // get list user with filters
    async getListUserSearchAdmin(data) {

        let url = API_URL + "User/getListUsersOfAdmin/search";
       
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
                return dataJson;
            })
            .catch(function (err) {
                console.error(err);
                return undefined;
            });
    }
    // List users for admin
    async getListUserForAdmin(data) {

        let url = API_URL + "User/getListUsersOfAdmin";
       
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
                return dataJson;
            })
            .catch(function (err) {
                console.error(err);
                return undefined;
            });
    }

     // Service to modify last schedule
     async getLastSchedule(iduser) {

        let url = API_URL + "membershipPayDetail/schedules/" + iduser;

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

    /**
     * Save data schedule in one schedule
     * @param {*} iduser 
     * @param {*} data 
     */
    async modifySchedule(iduser, data) {

        let url = API_URL + "suscription/join/schedule/";// + iduser;

        return await fetch(url, {
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

    /**
     * End region -----------------------------------------------------------
     */

    //Get suscripciotns  for admin
    async getSuscriptionByUserAdmin(idUser) {

        let url = API_URL + "suscription/admin/user/" + idUser;
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

     


}

export default new UserService();
