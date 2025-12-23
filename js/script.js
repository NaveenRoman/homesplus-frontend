const API_BASE = "https://homesplus-backend1.onrender.com";

// SEND OTP
async function sendOTP() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Please enter email";
    return;
  }

  const res = await fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  message.textContent = data.message;

  if (res.ok) {
    document.getElementById("otp-section").style.display = "block";
  }
}

// VERIFY OTP
async function verifyOTP() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const message = document.getElementById("message");

  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (!res.ok) {
    message.textContent = data.message;
    return;
  }

  // 🔐 STORE TOKEN
  localStorage.setItem("token", data.token);

  message.textContent = "Login successful!";

  // Example redirect
  setTimeout(() => {
    window.location.href = "property/index.html";
  }, 1000);
}
