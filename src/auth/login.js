// import Navbar from "../navbar.js";

export default  function Login() {

    const Container = document.getElementById("Container");

    // Navbar(Container)
    Container.innerHTML += `
<div class="form" >
        <h1 class="minititle">Log In</h1>
        <form id="loginForm">
        <label class="lbl" for="email">Email or username</label>
        <input class="impt" type="text" id="email" name="email" />
        <p id="erroremail"></p>

        <label class="lbl" for="password">Password</label>
        <input class="impt" type="password" id="password" name="password" />
        <p id="errorPassword"></p>

        <button type="submit" class="submit">Submit</button>
    </form>
</div>
`;
}

