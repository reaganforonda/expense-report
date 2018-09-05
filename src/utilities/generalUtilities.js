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
}