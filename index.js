$(document).ready(() => {
  $('#navRegister').click((e) => {
    e.preventDefault();
    $('#login').hide();
    $('#register').show();
    $('#foodList').hide();
    $('#firstNameRegister').val("")
    $('#lastNameRegister').val("")
    $('#emailRegister').val("")
    $('#passwordRegister').val("");
  });

  $('#navLogin').click((e) => {
    e.preventDefault();
    $('#login').show();
    $('#register').hide();
    $('#todoList').hide();
    $('#emailLogin').val("")
    $('#passwordLogin').val("");
  });

  $('#navLogout').click((e) => {
    e.preventDefault();
    logout();
  });

  $('#form-login').on('submit', (e) => {
    e.preventDefault();
    login();
  });

  $('#form-register').on('submit', (e) => {
    e.preventDefault();
    register();
  });
})

const checkIsLoggedIn = () => {
  if (localStorage.getItem('access_token')) {
    $('#navLogin').hide();
    $('#navLogout').show();
    $('#navRegister').hide();

    $('#login').hide();
    $('#register').hide();
    $('#foodList').show();

    getFoods();
  } else {
    $('#navLogin').show();
    $('#navLogout').hide();
    $('#navRegister').show();

    $('#login').show();
    $('#register').hide();
    $('#foodList').hide();
    $('#firstNameRegister').val("")
    $('#lastNameRegister').val("")
    $('#emailRegister').val("")
    $('#passwordRegister').val("");
    $('#emailLogin').val("")
    $('#passwordLogin').val("");

    clearFoods();
  }
};

const register = () => {
  let firstName = $('#firstNameRegister').val();
  let lastName = $('#lastNameRegister').val();
  let email = $('#emailRegister').val();
  let password = $('#passwordRegister').val();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/register',
    data: {
      firstName,
      lastName,
      email,
      password,
    }
  })
    .done(() => {
      $('#firstNameRegister').val("")
      $('#lastNameRegister').val("")
      $('#emailRegister').val("")
      $('#passwordRegister').val("");
      checkIsLoggedIn();
    })
    .fail((err) => {
      const errors = err.responseJSON.errorMessages;
      console.log(errors.join(', '))
    })
}

const login = () => {
  let email = $('#emailLogin').val();
  let password = $('#passwordLogin').val();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/signin',
    data: {
      email,
      password,
    }
  })
    .done((data) => {
      const { access_token } = data;
      localStorage.setItem('access_token', access_token);
      $('#emailLogin').val("")
      $('#passwordLogin').val("");
    })
    .fail((err) => {
      const errors = err.responseJSON.errorMessages;
      console.log(errors.join(', '))
    })
    .always(() => {
      checkIsLoggedIn();
    });
};

const logout = () => {
  localStorage.removeItem('access_token');
  checkIsLoggedIn();
};

const getFoods = () => {

}

const clearFoods = () => {
  $('#foodList').empty();
}