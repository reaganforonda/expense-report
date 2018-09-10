module.exports = {
    /*
     * Function to validate email
     * @param String email = Email that user has entered and needs validation - Must be max 255 Characters
     */
    validEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email) && email.length <= 255 && email.length > 0;
    },

    /*
     * Function to validate address
     * @param String address = address that user has entered and need validation
     */
    validAddress(address) {
        return address.length > 0 && address.length <= 45
    },

    /*
     * Function to validate Zipcode
     * @param Integer Zipcode = Zipcode that needs validation
     */
    validZipCode(zipcode) {
        let re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        return re.test(zipcode);
    },

    /*
     * Function to validate City input
     * @param String City = City that user has entered
     */

    validCity(city){
        if(city){
            if(city.length <= 45){
               let re=/^[a-zA-Z\s]*$/
               if(re.test(city)){
                   return true;
               } else {
                   return false;
               }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

   /* 
    * Function to validate City State
    * @param String State = State that user has entered
    */
   validState(state) {
       if(state) {
           if(state.length === 2) {
               let re=/^[A-Z]+$/i
               if(re.test(state)){
                   return true;
               } else {
                   return false
               }
           } else {
               return false;
           }
       } else {
           return false;
       }
   },

   /* 
    * Function to generate a random string of a specified length
    * @param Integer length = length of the random string that is to be generated
    * Returns a string
    */
   generateRandomString(length) {
       let randomString='';
       const characters ='abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
       for(let i =0; i <= length; i++) {
           randomString += characters.charAt(Math.floor(Math.random() * characters.length));
       }
       return randomString;
   },

    /* Function to truncate date receive from Postgres to Readable string
     * @param String date = date received from Postgres
     */
    formatDate(date){
        let truncatedDate = date.slice(0,10);
        return truncatedDate
    },

    /* Function to format currencty
     * @param Integer numer = number to convert to a USD currenty format
     */
    formatCurrency(number){
        return '$' +' ' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}