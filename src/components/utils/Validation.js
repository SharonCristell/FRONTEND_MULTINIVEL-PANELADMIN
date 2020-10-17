import React from 'react';

class  Validation {

    convertDate(date){
        let dformat =(( "00" + (date.getDate())).slice(-2) + "/"  + ("00" + (date.getMonth()+1)).slice(-2) + "/"  +  date.getFullYear());
        return dformat;
    }

    convertExtendedDate(date){
        let dformat =(( "00" + (date.getDate())).slice(-2) + "/"  + ("00" + (date.getMonth()+1)).slice(-2) + "/"  +  date.getFullYear()+"   "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
        return dformat;
    }

    convertDateToStringEx(dateString){
        
        let dformat = "";
        if(dateString !== null){
            let date = new Date(dateString);
            if(!isNaN(date)) {
                if(date.getFullYear() === 1 || date.getFullYear() <= 1900) {
                    dformat = "";
                } else {
                    let day = ("00" + (date.getDate())).slice(-2);
                    let month = ("00" + (date.getMonth()+1)).slice(-2) 
                    let year =  date.getFullYear();
    
                    dformat =( year + "-"  +  month+ "-"  + day);
                }
            }
        }
        
        return dformat;
    }

    convertDateToString(dateString){
        // console.log(date.getFullYear())
        let dformat = "";
        if(dateString !== null){
            let date = new Date(dateString);
            if(!isNaN(date)) {
                if(date.getFullYear() === 1 || date.getFullYear() <= 1900) {
                    dformat = "";
                } else {
                    dformat =(( "00" + (date.getDate())).slice(-2) + "/"  + ("00" + (date.getMonth()+1)).slice(-2) + "/"  +  date.getFullYear());
                }
            }
        }
        
        return dformat;
    }

  


}

export default new Validation();