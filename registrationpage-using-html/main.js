document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const country = document.getElementById("country").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    const gender = document.querySelector('input[name="gender"]:checked');
  
    if (!gender) {
      alert("Please select a gender.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    alert(`🎉 Registration Successful!
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Gender: ${gender.value}
  DOB: ${dob}
  Country: ${country}`);
  });
  