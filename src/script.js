import Navbar from "./navbar.js";
import Login from "./auth/login.js";
import validLogin from "./auth/validLogin.js";

const postsContainer = document.getElementById("Container");

function router(path) {
    const routes = {
        '/': addEventOnPosts,  // Homepage
        '/login': Login        // Login page
    };

    if (!localStorage.getItem('Token')){
        path='/login'
    }
    if (routes[path]) {
        postsContainer.innerHTML = ''; // Clear the container before rendering new content
        routes[path](); // Call the function for the matched route
    } else {
        postsContainer.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
}


function navigateTo(path) {

    router(path);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    router(location.pathname);
});

// Event delegation for link clicks
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        e.preventDefault(); // Prevent default anchor behavior
        navigateTo(e.target.getAttribute('href')); // Navigate to the link's href
    }
});

// Render the homepage content
function addEventOnPosts() {
   
    postsContainer.innerHTML += '<h1>Welcome to the homepage</h1>';
}

// Initially call router based on current path
router(location.pathname);


postsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    // const postElement =e.target.closest(".submit");
    // console.log(postElement);
    
    const valid = e.target.classList.contains("submit")
    console.log(valid);
    
    if (valid) {
        validLogin()
    }
})