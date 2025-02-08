export default function Navbar() {
    
    const Container = document.getElementById("Container");
    const header = document.createElement("header");

    // Create logo paragraph
    const logo = document.createElement("p");
    logo.className = "logo";
    const logoLink = document.createElement("a");
    logoLink.href = "/";
    logoLink.className = "logolink";
    logoLink.textContent = "Forum";
    logo.appendChild(logoLink);

    // Create navbar list
    const navbar = document.createElement("ul");
    navbar.className = "navbar";



    // User is not logged in
    navbar.innerHTML = ""
    const loginItem = document.createElement("li");
    const loginLink = document.createElement("a");
    loginLink.className = "navlinks login";
    loginLink.href = "/login";
    loginLink.textContent = "Log In";
    loginItem.appendChild(loginLink);



    navbar.appendChild(loginItem);




    header.appendChild(logo)
    header.appendChild(navbar)
    Container.appendChild(header)

}

