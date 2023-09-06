// way of fetch the value of tag by custom selector write in '[custom selector name]'
const inputSlider = document.querySelector("[dataSliderLength]");
const dataLengthNumDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[datacpoyBtn]");
const dataCopyMessage = document.querySelector("[data-copyMsg]");
const upperCase = document.querySelector("#Uppercase");
const lowerCase = document.querySelector("#lowercase");
const sysmobls = document.querySelector("#symbols");
const NumbersV = document.querySelector("#numbers");
const indicator = document.querySelector("[data-Indicater]");
const generateBtn = document.querySelector(".Generatepassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const addtext = document.querySelector(".addText");
const validateCheck = document.querySelector("#lowercase");

let password = "";
let passwordLength = 10;
let checkboxCount = 0;
handlSlider(passwordLength);

// handle the slider set the password length =>setPasswordlength
function handlSlider() {
	inputSlider.value = passwordLength;
	dataLengthNumDisplay.innerText = passwordLength;
	// yha par min or max value ke according slider ke part me bg-color dalna hai 
	const min = inputSlider.min;
	const max = indicator.max;
	inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}

// set the color of indecater circle according to their length
setinticater("#ccc", 'Good');


// setIndicater=>this add the color of password strength and shadow
function setinticater(color, text) {
	indicator.style.backgroundColor = color;
	addtext.innerText = text;
	// also add shadow 
	indicator.style.boxShadow = `0px 0px 10px 1px ${color}`;
	addtext.style.color = color;

}

// generate random Integer in minimum to maximum range 
function generateRandomInteger(max, min) {
	// Math.generateRandomInteger()//generate 0 to max-1
	// generate random int decimal value min to max range

	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
	return generateRandomInteger(0, 9);
}

function generateLowerCaseCharacter() {
	// String.fromCharCode() take integer and return character
	return String.fromCharCode(generateRandomInteger(97, 123));
}

function generateUpperCase() {

	// String.fromChar() take integer and return character
	return String.fromCharCode(generateRandomInteger(65, 91));
}

// symbols ASCII Value dont know  so we make string and store all the symbols inside it 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateSymbols() {
	// we get the random no from 0 to symbols string length-1 ;
	const getRandomNumValue = generateRandomInteger(0, symbols.length);
	return symbols.charAt(getRandomNumValue);
}

function calculateStringLength() {
	// Get the values of the checkboxes and password length
	const hasUpperCase = upperCase.checked;
	const hasLowerCase = lowerCase.checked;
	const hasSymbols = sysmobls.checked;
	const hasNumbers = NumbersV.checked;
	passwordLength = '';
	// Get the password length here;

	// Check the conditions for password strength
	if ((hasUpperCase && hasLowerCase && hasNumbers && hasSymbols) || passwordLength >= 12) {
		setinticater('#008000', 'Strong');
	} else if ((hasUpperCase && hasLowerCase && (hasNumbers || hasSymbols)) && passwordLength <= 10) {
		setinticater('#0f0', 'Good');
	} else if (((hasLowerCase || hasUpperCase) || hasNumbers || hasSymbols) && passwordLength <= 6) {
		setinticater('#ff0', 'Average');
	} else {
		setinticater('#f00', 'Weak');
	}
}

// function setIndicator(color, strength) {
//     // Implement your code to set the strength indicator's color and text here
// }

async function copyContentFromButton() {
	//   navigator.clipboard.writeText()=> we copy the content from the click board 
	try {
		await navigator.clipboard.writeText(passwordDisplay.value);
		dataCopyMessage.innerText = "copied";
	} catch (e) {
		dataCopyMessage.innerText = "failed";
	}

	dataCopyMessage.classList.add('active');
	// css ke andar class active hogi 
	// // 2second ke bad copied method invisible ho jayega 
	setTimeout(() => {
		dataCopyMessage.classList.remove('active')
	}, 2000);

}

// we add event listner on check box for count the check box if check box count 
// so we can generate the password 

function handleCheckBoxChange() {
	allCheckBox.forEach((checkbox) => {
		if (checkbox.checked) {
			checkboxCount++;
		}
	});

	// if checkbox is click 3 but you select length password length 1 by slider 
	// that case handle by this 
	if (passwordLength < checkboxCount) {
		passwordLength = checkboxCount;
		handlSlider();
	}
}

// Suffle the password 
function sufflePassword(array) {
	// fisher yates method =>kisi array ko suffle kar sakte ho

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	let str = "";
	array.forEach((em) => str += em);
	return str;
}

allCheckBox.forEach((checkbox) => {
	checkbox.addEventListener('change', handleCheckBoxChange)
})


// add eventListner on slider when we move slider forword and 
// backword we change the value of the password length which is .
// display on the screen


// input event karne par value change kar do 
inputSlider.addEventListener('input', (e) => {
	passwordLength = e.target.value;
	handlSlider()
});


// copy btn  me add event listner when it has some value 
copyBtn.addEventListener('click', () => {
	// it copy the content when display screen have some text 
	// also you can do if password length is greater than 0 you can copy 
	if (passwordDisplay.value) {
		copyContentFromButton();
	}
});


// Generate the Final Password 
generateBtn.addEventListener('click', () => {

	// none of the checkBox selected 
	// there is no password get 
	if (checkboxCount === 0) {
		return;
	}
	if (passwordLength < checkboxCount) {
		passwordLength = checkboxCount;
		handlSlider();
	}
	console.log("i  am colling ")
	// lets find the new password

	// remove old password 
	password = "";

	let funcArr = [];
	if (upperCase.checked) {
		funcArr.push(generateUpperCase);
	}
	if (lowerCase.checked) {
		funcArr.push(generateLowerCaseCharacter);
	}
	if (sysmobls.checked) {
		funcArr.push(generateSymbols);
	}
	if (NumbersV.checked) {
		funcArr.push(getRandomNumber);
	}
	// compulsary addition
	for (let i = 0; i < funcArr.length; i++) {
		password += funcArr[i]();
	}
	console.log("cumpulsary addition done");


	//Remaining addition done 
	for (let i = 0; i < passwordLength - funcArr.length; i++) {
		console.log("genarter is" + i)
		let randIndex = generateRandomInteger(0, funcArr.length);
		password += funcArr[randIndex]();
	}

	console.log("ramaining addition done ");
	// suffle the password
	password = sufflePassword(Array.from(password));
	console.log("password suffling done")
	// show on the display 
	passwordDisplay.value = password;
	console.log("Ui me password aa gya ");

	// calculate the password length()
	calculateStringLength();
});

// Below is the best Logic for reset the form 
function resetForm() {
	// Reset checkboxes to their initial state (unchecked)
	upperCase.checked = false;
	lowerCase.checked = false;
	sysmobls.checked = false;
	NumbersV.checked = false;
	passwordDisplay.value = '';
	setinticater('var(--pl-white)', 'Good');
}
