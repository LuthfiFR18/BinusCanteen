
import '../Style/Login.css';

function Login(){
    return(
        <div className="wrapper">
          <h1>Login</h1>
          <form action="#">
            <h5>Email:</h5>
            <input type="email" placeholder="Email"></input>
            <a href="/HTML/Registration.html">
                Dont Have Account?</a>
            <h5>Password:</h5>
            <input type="password" placeholder="Password"></input>
            <a href="/HTML/ResetPassword.html">
                Reset Password?</a>
                </form>
                <a href="/HTML/DashboardBinusian.html">
                    <button>Login</button>
                </a>
</div>
    )
}

export default Login;