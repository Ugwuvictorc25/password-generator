const result = document.querySelector(".result");
const passwordLength = document.getElementById("passwordLength");
const upperCaseEl = document.getElementById("uppercase");
const lowerCaseEl = document.getElementById("lowercase");
const symbolEl = document.getElementById("symbol");
const numberEl = document.getElementById("number");
const passwordBtn = document.querySelector(".password-btn");
const clipboardBtn = document.querySelector(".btn");

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

clipboardBtn.addEventListener("click", () => {
	const textArea = document.createElement("textarea");
	const password = result.innerText;

	if (!password) return;
	textArea.value = password;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	textArea.remove();
	alert("Password copied to clipboard!");
});

passwordBtn.addEventListener("click", function () {
	const length = +passwordLength.value;
	const hasUpperCaseEl = upperCaseEl.checked;
	const hasLowerCaseEl = lowerCaseEl.checked;
	const hasSymbol = symbolEl.checked;
	const hasNumber = numberEl.checked;

	result.innerText = generatePassword(hasUpperCaseEl, hasLowerCaseEl, hasSymbol, hasNumber, length);
});

function generatePassword(upper, lower, symbol, number, length) {
	let generatedPassword = "";
	const addedNumber = +(upper + lower + symbol + number);
	const availableArray = [{ upper }, { lower }, { symbol }, { number }].filter((el) => Object.values(el)[0]);
	for (let i = 0; i < length; i += addedNumber) {
		availableArray.forEach((arr) => {
			const funcName = Object.keys(arr)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	return generatedPassword.slice(0, length);
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}
