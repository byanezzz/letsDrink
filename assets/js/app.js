$(document).ready(function() {
  randomCoctails();
})

$('.dropdown-button').dropdown({
  inDuration: 300,
  outDuration: 225,
  constrainWidth: true, // Does not change width of dropdown to that of the activator
  hover: false, // Activate on hover
  gutter: 0, // Spacing from edge
  belowOrigin: false, // Displays dropdown below the button
  alignment: 'left', // Displays dropdown with edge aligned to the left of button
  stopPropagation: false // Stops event propagation
});

//-------INICIALIZANDO Firebase------------------//
/* var config = {
  apiKey: "AIzaSyBnXR6kFDHMqSuKkRpUjDVozxtoVaboOs0",
  authDomain: "ourapp-ea016.firebaseapp.com",
  databaseURL: "https://ourapp-ea016.firebaseio.com",
  projectId: "ourapp-ea016",
  storageBucket: "ourapp-ea016.appspot.com",
  messagingSenderId: "65213460679"
};
firebase.initializeApp(config);

var uid = ""; */
//-----------------AUTENTICACIÓN DE EMAIL---------------------//
/* $('#logIn').click(function() {
  const email = $('#emailLogin').val();
  const pass = $('#passwordLogin').val();
  const auth = firebase.auth();
  $('#emailLogin').val("");
  $('#passwordLogin').val("");
  
  var promise = auth.signInWithEmailAndPassword(email, pass)
    .then(function(user) {
      console.log(user);
    })
    .catch(e => console.log(e.message));
});
 */
/* $('#register').click(function() {
  var email = $('#emailRegister').val();
  var pass = $('#passwordRegister').val();
  var auth = firebase.auth();
  $('#emailRegister').val("");
  $('#passwordRegister').val("");

  var promise = auth.createUserWithEmailAndPassword(email, pass)
    .then(function(user) {
      console.log(user);
    })
    .catch(function(error) {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('Contraseña muy débil');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}); */
/* $('#logOut').click(function() {
  firebase.auth().signOut();
  uid = "";
}); */

//Se mantiene escuchando cualquier cambio en el estado del usuario en tiempo real
/* firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    uid = firebaseUser.uid;
    start();
  } else {
    console.log('no logueado');
    stop(); */
//$('#logOut').classList.add('hide');
/*   }
}); */
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

//------------------CONSULTAS A LA API THECOCKTAILDB POR FILTRO-------------------//
let selectFilter;
let strSelected;
let anotherDrink = 0;

function fetchByName(coctelName) {
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctelName}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectFilter = data.drinks;
      renderCocktails()
    })
    .catch((error) => {
      console.log('Hubo un problema con la operación: ' + error.message);
    })
}
$('#search').keydown(function(event) {
  if (event.which == 13) {
    let coctelName = $('#search').val();
    event.preventDefault();
    fetchByName(coctelName);
    $('#search').val('');
  };
});

function fetchByFilter(filter) {
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/list.php?${filter}=list`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectFilter = data.drinks;
      searchByFilter(filter);
    })
    .catch((error) => {
      console.log('Hubo un problema con la operación: ' + error.message);
    });
}

$('.filtro').click(function() {
  let f;
  if (this.id === 'categories') {
    f = 'c';
  } else if (this.id === 'glasses') {
    f = 'g';
  } else if (this.id === 'alcoholic') {
    f = 'a';
  }
  fetchByFilter(f);
})

function randomCoctails() {
  fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectedFilter = data.drinks;
      giveMeACoctail();
    })
    .catch((error) => {
      console.log('Hubo un problema con la operación: ' + error.message);
    });
}

function giveMeACoctail() {
  if (anotherDrink < 5) {
    $('#slide-out').append(
      `<li class="recommended truncate" id="${selectedFilter[0].strDrink}"><i class="material-icons">local_bar</i><p class="recommendedLinks">${selectedFilter[0].strDrink}</p></li>`
    )
    anotherDrink++
    randomCoctails();
  }
  $('.recommended').click(function(e) {
    let randomSelected = e.currentTarget.id;
    fetchByName(randomSelected);
  })
}


function fetchSelectedFilter(filter, strSelected) {
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter}=${strSelected}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectFilter = data.drinks;
      console.log(data);
      renderCocktails()

    })
}

function searchByFilter(filter) {
  $('.dropdown-content').empty();
  if (filter === 'c') {
    for (let i = 0; i < selectFilter.length; i++) {
      $('.dropdown-content').append(
        `<li class ="strSelect" id="${selectFilter[i].strCategory}"><a href="#!">${selectFilter[i].strCategory}</a></li>`)
    }
  } else if (filter === 'g') {
    for (let i = 0; i < selectFilter.length; i++) {
      $('.dropdown-content').append(
        `<li class ="strSelect" id="${selectFilter[i].strGlass}"><a href="#!">${selectFilter[i].strGlass}</a></li>`)
    }
  } else if (filter === 'a') {
    for (let i = 0; i < selectFilter.length; i++) {
      $('.dropdown-content').append(
        `<li class ="strSelect" id="${selectFilter[i].strAlcoholic}"><a href="#!">${selectFilter[i].strAlcoholic}</a></li>`)
    }
  }
  $('.strSelect').click((e) => {
    strSelected = e.currentTarget.id;
    fetchSelectedFilter(filter, strSelected);
  })
}


function fetchCocktailSelected(cocktailSelected) {
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailSelected}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectFilter = data.drinks[0];
      cocktailRecipe(cocktailSelected)
    })
    .catch((error) => {
      console.log('Hubo un problema con la operación: ' + error.message);
    });
}

function renderCocktails() {
  $('#cocktail').empty();
  for (let i = 0; i < selectFilter.length; i++) {
    $('#cocktail').append(`<div class="col l3 card"  id="${selectFilter[i].idDrink}">
	<div class="card-image waves-effect waves-block waves-light">
		<img class="activator" src="https://${selectFilter[i].strDrinkThumb}"/>
	</div><div class="card-content">
		<span class="card-title activator grey-text text-darken-4"><p class="drink-name truncate">${selectFilter[i].strDrink}</p><i class="material-icons right">more_vert</i></span>
	</div>
	<div class="card-reveal ${selectFilter[i].idDrink}">
		<span class="card-title grey-text text-darken-4">${selectFilter[i].strDrink}<i class="material-icons right">close</i></span>
	</div>
</div>`)
  }
  $('.card').click(function() {
    let cocktailSelected = this.id;
    fetchCocktailSelected(cocktailSelected);
  })
}

function cocktailRecipe(cocktailSelected) {
  $(`.cocktailDescription.${cocktailSelected}`).remove();
  //Sacamos en un array los ingredientes del cocktail
  let ingredient = [];
  let j = 1;
  let html = '';
  for (let i in selectFilter) {
    if (i === `strIngredient${j}` && selectFilter[i] !== "" && selectFilter[i] !== null) {
      ingredient.push(selectFilter[i]);
      j++;
    }
  }
  for (let i = 0; i < ingredient.length; ++i) {
    html += `<li>${ingredient[i]}</li>`;
  }
  $(`.card-reveal.${cocktailSelected}`).append(`<div class="cocktailDescription ${cocktailSelected}"><h4>Ingredients</h4><ul>${html}</ul><h4>Instruction</h4><p>${selectFilter.strInstructions}</p></div>`)
}