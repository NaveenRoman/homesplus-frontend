/* ===============================
   API CONFIG
================================ */
const API_BASE = "https://homesplus-backend1-1.onrender.com/api";



let useOTP = false;

/* TOGGLE LOGIN MODE */
function toggleMode() {
  useOTP = !useOTP;

  document.getElementById("otpBox").style.display = "none";
  document.getElementById("message").textContent = "";

  document.getElementById("subtitle").textContent =
    useOTP ? "Login using OTP" : "Login using password";

  document.querySelector(".switch span").textContent =
    useOTP ? "Use password instead" : "Use OTP instead";
}

/* MAIN LOGIN HANDLER */
async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("message");

  if (!email) {
    msg.textContent = "❌ Email required";
    msg.style.color = "red";
    return;
  }

  // OTP FLOW
  if (useOTP) {
    sendOTP(email);
    return;
  }

  // PASSWORD FLOW
  if (!password) {
    msg.textContent = "❌ Password required or switch to OTP";
    msg.style.color = "red";
    return;
  }

  msg.textContent = "🔐 Password login coming next step";
  msg.style.color = "orange";
}

/* SEND OTP */
async function sendOTP(email) {
  const msg = document.getElementById("message");

  try {
    const res = await fetch(`${API}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message;
      msg.style.color = "red";
      return;
    }

    msg.textContent = "✅ OTP sent to email";
    msg.style.color = "green";
    document.getElementById("otpBox").style.display = "block";

  } catch {
    msg.textContent = "❌ Server error";
    msg.style.color = "red";
  }
}

/* VERIFY OTP */
async function verifyOTP() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const msg = document.getElementById("message");

  try {
    const res = await fetch(`${API}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message;
      msg.style.color = "red";
      return;
    }

    localStorage.setItem("token", data.token);
    msg.textContent = "✅ Login successful!";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "property/index.html";
    }, 800);

  } catch {
    msg.textContent = "❌ OTP verification failed";
    msg.style.color = "red";
  }
}

/* SKIP LOGIN */
function skipLogin() {
  localStorage.setItem("guest", "true");
  window.location.href = "property/index.html";
}


// 🔔 Notify admin on site visit
window.addEventListener("load", () => {
  fetch("https://homesplus-backend1-1.onrender.com/api/visit", {
    method: "POST",
  }).catch(() => {});
});
