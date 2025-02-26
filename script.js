import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDZMn66OKhiMTOFhpuc5R9YHLOJduwKyAg",
  authDomain: "fir-authentication-a85a1.firebaseapp.com",
  databaseURL: "https://fir-authentication-a85a1-default-rtdb.firebaseio.com",
  projectId: "fir-authentication-a85a1",
  storageBucket: "fir-authentication-a85a1.appspot.com",
  messagingSenderId: "107807542671",
  appId: "1:107807542671:web:fa8d1d2c688d34274a8ffa"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


function saveUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!username || !email || !phone) {
    alert("All fields are required!");
    return;
  }

  const userRef = ref(database, "user/" + username);
  set(userRef, {
    username: username,
    email: email,
    phoneNumber: phone
  })
    .then(() => {
      alert("User data saved successfully!");
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

document.getElementById("saveUserBtn").addEventListener("click", saveUser);

function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      document.getElementById("userDetails").innerText = `Signed in as: ${user.displayName} (${user.email})`;
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
      alert("Error: " + error.message);
    });
}

document.getElementById("googleSignInBtn").addEventListener("click", signInWithGoogle);

function logout() {
  signOut(auth)
    .then(() => {
      alert("Successfully signed out.");
      document.getElementById("userDetails").innerText = "";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

document.getElementById("logoutBtn").addEventListener("click", logout);
