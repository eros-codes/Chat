document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.querySelector(".form.login");
	const loginUsername = document.getElementById("login-username")
	const loginPassword = document.getElementById("login-password");
	const rememberUser = document.getElementById("remember");
	const forgetPasswordBtn = document.getElementById("forgot-password-btn");
	const showSignUp = document.getElementById("show-signup");

	const signupForm = document.querySelector(".form.signup");
	const signupName = document.getElementById("name");
	const signupEmail = document.getElementById("email");
	const signupUsername = document.getElementById("username");
	const signupBtn = document.getElementById("signup-btn");
	const showLogIn = document.getElementById("show-login");

	const verifyForm = document.querySelector(".form.verify");
	const codeResendTimer = document.getElementById("code-resend-timer");
	const backToSignUp = document.getElementById("back-to-signup");

	const passwordForm = document.querySelector(".form.password");
	const forgotForm = document.querySelector(".form.forget-password");
	const allForms = document.querySelectorAll(".form");

	let sentCode;
	let forgotPass = false

	function showForm(targetForm) {
		allForms.forEach((f) => (f.style.display = "none"));
		if (targetForm) targetForm.style.display = "flex";
	}

	function sendRandomeCode () {
		sentCode = Math.floor(Math.random() * 900000 + 100000);
		console.log(sentCode)
	}

	function startResendTimer () {
		let sec = 60;
		codeResendTimer.classList.add("disabled")
		let timer = setInterval(function () {
			if (sec === 0) {
				codeResendTimer.classList.remove("disabled")
				codeResendTimer.innerHTML = "Resend";
				clearInterval(timer)
			}
			if (sec % 60 === 0) {
				codeResendTimer.innerHTML = `1:00`
			} else if ( sec > 9) {
				codeResendTimer.innerHTML = `0:${sec}`
			} else {
				codeResendTimer.innerHTML = `0:0${sec}`
			}
			console.log(sec)
			sec--
		}, 1000);  
	}

	if (loginForm) {
		loginForm.addEventListener("submit", function (e) {
			e.preventDefault();
			window.location.href = "../main/main-page.html";
		});

		if (forgetPasswordBtn) {
			forgetPasswordBtn.addEventListener('click', () => {
				showForm(forgotForm)
			})
		}
	
		if (showSignUp) {
			showSignUp.addEventListener("click", () => {
				showForm(signupForm);
			});
		}
	}

	if (signupForm) {
		signupForm.addEventListener('submit', (e) => {
			e.preventDefault();
			sendRandomeCode();
			startResendTimer();
			forgotPass = false
			showForm(verifyForm);
		})

		showLogIn.addEventListener('click', () => {
			showForm(loginForm)
		})
	}
	
	if (verifyForm) {
		const codeDigits = verifyForm.querySelectorAll(".code-digit");
		const codeHidden = verifyForm.querySelector("#code-hidden");
		codeDigits[0].focus

		codeDigits.forEach((input, idx) => {
			input.addEventListener("input", (e) => {
				input.value = input.value.replace(/\D/g, "").slice(-1);
				if (input.value && idx < codeDigits.length - 1) {
					codeDigits[idx + 1].focus();
				}
			});

			input.addEventListener("keydown", (e) => {
				if (e.key === "Backspace" && !input.value && idx > 0) {
					codeDigits[idx - 1].focus();
				} else if (e.key === "ArrowLeft" && idx > 0) {
					codeDigits[idx - 1].focus();
					e.preventDefault();
				} else if (
					e.key === "ArrowRight" &&
					idx < codeDigits.length - 1
				) {
					codeDigits[idx + 1].focus();
					e.preventDefault();
				}
			});

			input.addEventListener("paste", (e) => {
				e.preventDefault();
				const paste = (e.clipboardData || window.clipboardData)
					.getData("text")
					.replace(/\D/g, "");
				for (let i = 0; i < codeDigits.length; i++) {
					codeDigits[i].value = paste[i] || "";
				}
				const focusIndex = Math.min(
					paste.length,
					codeDigits.length - 1,
				);
				codeDigits[focusIndex].focus();
			});
		});

		verifyForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const code = Array.from(codeDigits)
				.map((i) => i.value || "")
				.join("");
			if (code.length < codeDigits.length) {
				alert("Please enter the full 6-digit code.");
				codeDigits[0].focus();
				return;
			}
			if (codeHidden) codeHidden.value = code;
			console.log(code)
			if (String(sentCode) === code) {
				showForm(passwordForm);
			} else {
				alert("The code entered does not match the one is sent.");
				return
			}
		});

		codeResendTimer.addEventListener('click', () => {
			sendRandomeCode();
			startResendTimer();
		})

		backToSignUp.addEventListener('click', () => {
			showForm(signupForm)
		})
	}

	if (forgotForm) {
		forgotForm.addEventListener("submit", function (e) {
			e.preventDefault();
			showForm(verifyForm);
			const firstDigit =
				verifyForm && verifyForm.querySelector(".code-digit");
			if (firstDigit) firstDigit.focus();
		});
	}

});
