import Api from "../api.js";
import addEventOnPosts from "../script.js";

export default  async function validLogin() {
    const postsContainer = document.getElementById("section");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var isValidusrname = true;
    var isValidpassword = true;
    if (email.value === "") {
      document.getElementById("erroremail").innerHTML = "email is null";
      document.getElementById("erroremail").style.color = "red";
      isValidusrname = false;
      } else {
      document.getElementById("erroremail").innerHTML = "";
      isValidusrname = true;
    }
  
    if (password.value === "") {
      document.getElementById("errorPassword").innerHTML = "Password is null";
      document.getElementById("errorPassword").style.color = "red";
      isValidpassword = false;
    } else {
      document.getElementById("errorPassword").innerHTML = "";
      isValidpassword = true;
    }
    const BaseEmail = btoa(`${email.value}:${password.value}`);

    if (isValidpassword && isValidusrname) {
     
        
        try {
            // Send the POST request
            const response = await fetch(`${Api}/auth/signin`, {
                method: "POST",
                headers: {
                   
                    "Authorization": `Basic ${BaseEmail}`,
                },

            });
    
            if (response.ok) {
                const data = await response.json();
            
                
               
                localStorage.setItem("Token", data)
                postsContainer.innerHTML=""
                addEventOnPosts()
            } else {
                const data = await response.json();
                // Handle error response from the server
                if (data.error) {
                    document.getElementById("errorPassword").innerHTML = data.error;
                    document.getElementById("errorPassword").style.color = "red";
                } else {
                    console.error("Unknown error occurred");
                    alert("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Unable to submit the comment due to a network issue.");
        }
    }
}


