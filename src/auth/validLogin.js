

export default  async function validLogin() {
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
    const BaseEmail =btoa(`${email.value}:${password.value}`)
  
    if (isValidpassword && isValidusrname) {
        console.log(`base ${BaseEmail}`);
        
      try {
        // Send the POST request
        const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
          method: "POST",
          headers: {
            "Authorization": `Basic ${BaseEmail}`,
          },
        });
        if (response.ok) {
            const data = await response.json();
        
            // Log the token to the console
            console.log("Token:", data.token);
    
            // Optionally, show an alert with the token
            alert(`Token: ${data.token}`);
          
        } else {
          const data = await response.json();
          document.getElementById("errorPassword").innerHTML = data.error;
          document.getElementById("errorPassword").style.color = "red";
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Unable to submit the comment due to a network issue.");
      }
    }
}


