
import Login from "./auth/login.js";
import validLogin from "./auth/validLogin.js";
import api from "../api.js";
import formation from "./data/formation.js"

const postsContainer = document.getElementById("Container");

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
console.log(Token);

async function addEventOnPosts() {
    const query = `{
  user {
    login
    firstName
    lastName
    totalDown
    totalUp
    totalUpBonus
    auditRatio
     finished_projects: groups(
      where: {group: {status: {_eq: finished}, _and: [{path: {_like: "%module%"}}, {path: {_nilike: "%piscine-js%"}}]}}
    ) {
      
    
      group {
        status
        
        path
        members{
          userLogin
        }
      }
    }
    totalXp: transactions_aggregate(
              where: {  
      type: { _eq: "xp" },
      event:{object:{name:{_eq :"Module"}}}
        }
        ) {
        aggregate {
        sum {
            amount
            }
          }
          } 
        
  }
  
  level : transaction(
    where: {
      type: { _eq: "level" },
      event:{object:{name:{_eq :"Module"}}}
    }
    order_by :{amount :desc}
    limit : 1
  ) {
    id
    amount
    type
    path
  
  }
}
`;

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
        console.log(response);


        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data);

        formation(postsContainer, data)

    } catch (error) {
        // Handle network errors or any other errors
        console.error('Failed to add event on posts:', error);
    }


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