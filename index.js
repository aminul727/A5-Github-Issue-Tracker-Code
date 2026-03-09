document.getElementById('login-btn').addEventListener('click', function(){
    const loginInputNumber = document.getElementById('user-number');
    const loginNumber = loginInputNumber.value;
    console.log(loginNumber);

const loginInputPin = document.getElementById('user-pass');
const loginPin = loginInputPin.value;
console.log(loginPin);
if(loginPin === 'admin123'){
    alert('login successfull');
    window.location.href = ('home.html');
}
else{
    alert('login failed!');
}
});
