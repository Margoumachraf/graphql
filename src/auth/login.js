
export default function Login() {
    const Container = document.getElementById("section");
    Container.innerHTML = `
<div class="form" >
        <h1 class="minititle">Log In</h1>
        <form id="loginForm">
        <label  class="lbl"for="email"><b>Email or username</b></label>
        <input class="impt" type="text" id="email" name="email" />
        <p id="erroremail"></p>
        <label  class="lbl"for="password"><b>Password</b></label>
        <input class="impt" type="password" id="password" name="password" />
        <p id="errorPassword"></p>

        <button type="submit" class="submit">Submit</button>
    </form>
</div>
`;
}

