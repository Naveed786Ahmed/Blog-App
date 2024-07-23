import { auth, GoogleAuthProvider, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "./blogfirebase.js"

const signUpBtn = document.getElementById("signUpBtn")
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const signUpCard = document.getElementById("signUpCard");
const loginCard = document.getElementById("loginCard");
const errors = document.getElementById("error");
const succ = document.getElementById("succ");
const loginBtn = document.getElementById("loginBtn");
const forgot = document.getElementById("forgot");
const googleLogin = document.getElementById("googleLogin")

function errorMessClose() {
    errors.style.display = "none"
}

function succMessClose() {
    succ.style.display = "none"
}

const signUpCardfux = () => {
    loginCard.style.display = "none";
    signUpCard.style.display = "block";
}

const loginCardfux = () => {
    signUpCard.style.display = "none";
    loginCard.style.display = "block";
}

const signUpBtnFux = () => {
    const pass = document.getElementById("pass");
    const email = document.getElementById("email");

    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            succ.style.display = "block"
            succ.innerHTML = "Successfully Register Yeah!"
            setTimeout(succMessClose, 1500);
            signUpCard.style.display = "none";
            loginCard.style.display = "block";
        })

        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            errors.style.display = "block"
            errors.innerHTML = errorMessage;
            setTimeout(errorMessClose, 3000);
        });
}

const loginBtnfux = () => {
    const email = document.getElementById("logemail");
    const pass = document.getElementById("loginpass");

    signInWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert(`Successfully Login Yeah`)
            location.pathname = `/pages/blog%20app/adminDashboard.html`
        })

        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            errors.style.display = "block"
            errors.innerHTML = errorMessage;
            setTimeout(errorMessClose, 3000);
        });
}

const forgotfux = () => {
    const email = document.getElementById("logemail");
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            succ.style.display = "block"
            succ.innerHTML = "Password Reset Email Sent!"
            setTimeout(succMessClose, 1500);
            signUpCard.style.display = "none";
            loginCard.style.display = "block";
        })

        .catch((error) => {
            const errorMessage = error.message;
            errors.style.display = "block"
            errors.innerHTML = errorMessage;
            setTimeout(errorMessClose, 3000);
        });
}

const googleLoginFux = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            alert(`Successfully Login Yeah`)
            location.pathname = `/pages/blog%20app/adminDashboard.html`

        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            errors.style.display = "block"
            errors.innerHTML = errorMessage;
            setTimeout(errorMessClose, 3000);
        });
}

signupLink.addEventListener("click", signUpCardfux)
loginLink.addEventListener("click", loginCardfux)
signUpBtn.addEventListener("click", signUpBtnFux)
loginBtn.addEventListener("click", loginBtnfux)
forgot.addEventListener("click", forgotfux)
googleLogin.addEventListener("click", googleLoginFux)