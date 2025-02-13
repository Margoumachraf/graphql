export default function Navbar(data) {

    
    const Container = document.getElementById("Container");
    const header = document.createElement("header");

    // Create logo paragraph
    const logo = document.createElement("p");
    logo.className = "logo";
    const logoLink = document.createElement("a");
    logoLink.href = "/";
    logoLink.className = "Home";
    logoLink.textContent = "Home";
    logo.appendChild(logoLink);

    // Create navbar list
    const navbar = document.createElement("ul");
    navbar.className = "navbar";



   

    const logoutItem = document.createElement("li");
    const logoutLink = document.createElement("a");
    logoutLink.className = "navlinks logout";
    
    logoutLink.textContent = "Log out";
    logoutItem.appendChild(logoutLink);


    const ProfileItem = document.createElement("li");
    const ProfileLink = document.createElement("a");
    ProfileLink.className = "navlinks logout";
    
    ProfileLink.textContent = data.map(i => i.login);
    ProfileItem.appendChild(ProfileLink);



    navbar.appendChild(logoutItem);
    navbar.appendChild(ProfileItem);




    header.appendChild(logo)
    header.appendChild(navbar)
    Container.appendChild(header)

}

