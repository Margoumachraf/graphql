
import Login from "./auth/login.js";
import validLogin from "./auth/validLogin.js";
import api from "../api.js";
import CreateNext from "./data/CreateNext.js";


const postsContainer = document.getElementById("section");

function router(path) {
    const routes = {
        '/': addEventOnPosts,
        '/login': Login
    };

    if (!localStorage.getItem('Token')) {
        path = '/login'
    }
    if (routes[path]) {
        postsContainer.innerHTML = '';
        routes[path]();
    } else {
        postsContainer.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
}


function navigateTo(path) {

    router(path);
}


window.addEventListener('popstate', () => {
    router(location.pathname);
});


document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        navigateTo(e.target.getAttribute('href'));
    }
});

const Token = localStorage.getItem('Token')


async function addEventOnPosts() {

    
    const ResponseQuery = await fetch('graphiql.gql');
    const query = await ResponseQuery.text();
   

    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
                query
            })
        });
      


        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);

        }

        
        const data = await response.json();
        


        CreateNext(postsContainer,data.data);

    } catch (error) {
        
        localStorage.clear()
        console.error('Failed to add event on posts:', error);
    }


}

// Initially call router based on current path
router(location.pathname);


postsContainer.addEventListener("click", (e) => {
    e.preventDefault();


    const valid = e.target.classList.contains("submit")
   

    if (valid) {
        validLogin()
    }
})