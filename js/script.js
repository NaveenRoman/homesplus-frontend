/* ===============================
   API CONFIG
================================ */
const API_BASE = "https://homesplus-backend1-1.onrender.com/api";



// 🔐 JWT PROTECTION
const token = localStorage.getItem("homesplus_token");

if (!token) {
  alert("Please login first");
  window.location.href = "../index.html";
}


/* ===============================
   SEND OTP
================================ */
async function sendOTP() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");
  const otpSection = document.getElementById("otp-section");

  message.textContent = "";

  if (!email) {
    message.textContent = "❌ Please enter email";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message || "Failed to send OTP";
      message.style.color = "red";
      return;
    }

    message.textContent = "✅ OTP sent to your email";
    message.style.color = "green";
    otpSection.style.display = "block";

  } catch (err) {
    message.textContent = "❌ Server error";
    message.style.color = "red";
  }
}

/* ===============================
   VERIFY OTP
================================ */
async function verifyOTP() {
  const email = document.getElementById("email").value.trim();
  const otp = document.getElementById("otp").value.trim();
  const message = document.getElementById("message");

  if (!otp) {
    message.textContent = "❌ Enter OTP";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message;
      message.style.color = "red";
      return;
    }

    localStorage.setItem("homesplus_token", data.token);

    message.textContent = "✅ Login successful!";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "property/index.html";
    }, 1000);

  } catch (err) {
    message.textContent = "❌ Verification failed";
    message.style.color = "red";
  }
}


// 🔔 Notify admin on site visit
window.addEventListener("load", () => {
  fetch("https://homesplus-backend1-1.onrender.com/api/visit", {
    method: "POST",
  }).catch(() => {});
});
