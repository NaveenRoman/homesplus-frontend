/* ===============================
   API CONFIG
================================ */
const API_BASE = "https://homesplus-backend1-1.onrender.com/api";

/* ===============================
   SEND OTP
================================ */
async function sendOTP() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");
  const otpSection = document.getElementById("otp-section");

  message.textContent = "";
  message.style.color = "#333";

  if (!email) {
    message.textContent = "❌ Please enter your email";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
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
    console.error(err);
    message.textContent = "❌ Server error";
    message.style.color = "red";
  }
}

/* ===============================
   VERIFY OTP (LOGIN / REGISTER)
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
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message || "Invalid OTP";
      message.style.color = "red";
      return;
    }

    // ✅ SAVE JWT + REGISTER FLAG
    localStorage.setItem("homesplus_token", data.token);
    localStorage.setItem("homesplus_registered", "true");

    message.textContent = "✅ Login successful!";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "property/index.html";
    }, 1000);

  } catch (err) {
    console.error(err);
    message.textContent = "❌ Verification failed";
    message.style.color = "red";
  }
}

/* ===============================
   VISITOR NOTIFICATION (SAFE)
================================ */
window.addEventListener("load", () => {
  fetch(`${API_BASE}/visit`, { method: "POST" }).catch(() => {});
});


// 🔔 Notify admin on site visit
window.addEventListener("load", () => {
  fetch("https://homesplus-backend1-1.onrender.com/api/visit", {
    method: "POST",
  }).catch(() => {});
});
