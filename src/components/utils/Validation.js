import React from 'react';

class  Validation {

    convertDate(date){
        let dformat =(( "00" + (date.getDate())).slice(-2) + "/"  + ("00" + (date.getMonth()+1)).slice(-2) + "/"  +  date.getFullYear());
        return dformat;
    }

}

export default new Validation();