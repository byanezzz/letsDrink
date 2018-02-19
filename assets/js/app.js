//Autentificación del usuario
//-------INICIALIZANDO Firebase------------------//
var config = {
  apiKey: "AIzaSyBnXR6kFDHMqSuKkRpUjDVozxtoVaboOs0",
  authDomain: "ourapp-ea016.firebaseapp.com",
  databaseURL: "https://ourapp-ea016.firebaseio.com",
  projectId: "ourapp-ea016",
  storageBucket: "ourapp-ea016.appspot.com",
  messagingSenderId: "65213460679"
};
firebase.initializeApp(config);

var uid = "";
//-----------------AUTENTICACIÓN DE EMAIL---------------------//
$('#logIn').click(function() {
  const email = $('#emailLogin').val();
  const pass = $('#passwordLogin').val();
  const auth = firebase.auth();
  $('#emailLogin').val("");
  $('#passwordLogin').val("");
  // Sign in
  var promise = auth.signInWithEmailAndPassword(email, pass)
    .then(function(user) {
      console.log(user);
    })
    .catch(e => console.log(e.message));
});

$('#register').click(function() {
  var email = $('#emailRegister').val();
  var pass = $('#passwordRegister').val();
  var auth = firebase.auth();
  $('#emailRegister').val("");
  $('#passwordRegister').val("");
  // Sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass)
    .then(function(user) {
      console.log(user);
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('Contraseña muy débil');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
});
$('#logOut').click(function() {
  firebase.auth().signOut();
  uid = "";
});

//Se mantiene escuchando cualquier cambio en el estado del usuario en tiempo real
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    uid = firebaseUser.uid;
    start();
  } else {
    console.log('no logueado');
    stop();
    //$('#logOut').classList.add('hide');
  }
});
//----------------ANIMACIÓN LOGIN/REGISTER--------------------//
$('#login-form-link').click(function(e) {
  $("#login-form").delay(100).fadeIn(100);
  $("#register-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});
//Al iniciar sesión
function start() {
  //$('#formLogin').addClass('hide');
}

/* fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
  }) */