export default class FieldValidation {  
    
    static emptyFieldValidation(str) {
        if(str.length == 0) return false;
        else return true;
    }

    static emailValidation(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static passwordValidation(password) {
        if(password.length >= 8) return true;
        else return false;
    }

    static heightValidation(height){
        if(height == 0) return -1;
        else if(height < 8) return 0;
        else return 1;
    }

    static weightValidation(weight) {
        if(weight == 0) return -1;
        else if(weight > 600) return 0;
        else return 1; 
    }

    static bodyFatPercentageValidation(percent) {
        if(percent == 0) return -1;
        else if(percent > 75) return 0;
        else return 1;
    }

    static birthValidation(dateStr) {
        let curDate = new Date()
        let arr = dateStr.split('-')
        let ageLimit = curDate.getFullYear() - 11        
        if(parseInt(arr[2]) < ageLimit) return true
        else return false
    }
}