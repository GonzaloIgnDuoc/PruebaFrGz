$(document).ready(function () {
  $("#div_validacion").hide();
  $("#sp_loading").hide();
  $("#btn_in").hide();
 

});


$(function () {
  $("#register").hide();
  $(".container-header-navigation-form").on("click", call => {
    if (call.target.parentNode.id == "loginTap") {
      $("#registerTap").removeClass("selected");
      $("#" + call.target.parentNode.id).addClass("selected");
      $("#login").show();
      $("#register").hide();
    } else {
      $("#loginTap").removeClass("selected");
      $("#" + call.target.parentNode.id).addClass("selected");
      $("#login").hide();
      $("#register").show();
    }
  })
})


function almacenarUsuario() {
  var correo = $("#emailregister").val();
  var contrasena = $("#passwordregister").val();
  var nombre = $("#nombreregister").val();
  var apellido = $("#apellidoregister").val();

  console.log(correo);
  console.log(contrasena);
  console.log(nombre);
  console.log(apellido);

  var data = {
    nombreFuncion: "ClienteAlmacenar",
    parametros: [correo, contrasena, nombre, apellido],
  };

  $.ajax({
    method: "POST",
    url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
    data: JSON.stringify(data),
    success: function (response) {
      if (response.result[0].RESPUESTA == "OK") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        $("#sp_loading").show();
        Toast.fire({
          icon: "success",
          title: "Cliente registrado correctamente",
        });

        $("#txt_nuevoCorreo").val("");
        $("#txt_nuevoContrasena").val("");
        $("#txt_nuevoNombre").val("");
        $("#txt_nuevoApellido").val("");

        var miModal = document.getElementById("exampleModal");
        $(miModal).modal("hide");
      } else if (response.result[0].RESPUESTA == "ERR01") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "Correo ingresado ya se encuentra registrado",
        });
      }

      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function login() {
  var correo = $("#emaillogin").val();
  var contrasena = $("#passwordlogin").val();


  var data = {
      nombreFuncion: "ClienteLogin",
      parametros: [correo, contrasena]
  };
  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        console.log(response.result)
        console.log(correo)
          if (response.result == 'LOGIN OK') {
            const islogin=localStorage.setItem(correo, 'correo')
            $('#sp_loading').show();
            console.log(islogin)
            isLogin=true;
            setTimeout(() => {
              
              Swal.fire({
                  title: 'Ingreso correcto',

                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              
              $("#btn_in").show();
              $("#btn_ingresa").hide()
              $('#sp_loading').fadeOut();
              }, 1500);
              ;

              /*var miModal = document.getElementById("cuenta.html");
              $(miModal).modal("hide");*/
              
              /*setTimeout(() => {$(window.location.href = "index.html");},4000);*/
                
              /*almacenarCompraID()*/
              
          } else if (response.result == 'LOGIN NOK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Credenciales inválidas'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}
function loginAdmin() {
  var correo = $("#emaillogin").val();
  var contrasena = $("#passwordlogin").val();


  var data = {
      nombreFuncion: "ClienteLogin",
      parametros: [correo, contrasena]
  };
  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
        console.log(response.result)
        console.log(correo)
          if (response.result == 'LOGIN OK') {
            
            $('#sp_loading').show();
            
            setTimeout(() => {
              
              Swal.fire({
                  title: 'Ingreso correcto',

                  icon: 'success',
                  confirmButtonText: 'OK'
              });
              
              $("#btn_in").show();
              $("#btn_ingresa").hide()
              $('#sp_loading').fadeOut();
              }, 1500);
              ;

              /*var miModal = document.getElementById("cuenta.html");
              $(miModal).modal("hide");*/
              
              setTimeout(() => {$(window.location.href = "administrador.html");},4000);
                
              /*almacenarCompraID()*/
              
          } else if (response.result == 'LOGIN NOK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Credenciales inválidas'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}
function almacenarProducto() {
  var codigo = $("#codeprd").val();
  var nombre = $("#nombreprd").val();
  var descripcion = $("#descprd").val();
  var precio = $("#precioprd").val();
  var stock = $("#stockprd").val();


  var data = {
      nombreFuncion: "ProductoAlmacenar",
      parametros: [codigo, nombre,descripcion,precio,stock]
  };

  $.ajax({
      method: "POST",
      url: "https://fer-sepulveda.cl/API_PLANTAS/api-service.php",
      data: JSON.stringify(data),
      success: function (response) {
          if (response.result[0].RESPUESTA == 'OK') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              
              })

              Toast.fire({
                  icon: 'success',
                  title: 'Producto almacenado'
              });
              
              
          } else if (response.result[0].RESPUESTA == 'ERR01') {
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })

              Toast.fire({
                  icon: 'warning',
                  title: 'Producto ya se encuentra registrado'
              });
          }


          console.log(response);
      },
      error: function (error) {
          console.log(error);
      }
  });
}
/*function login() {
  let usuario = $("#txt_usuario").val();
  let contrasena = $("#txt_contrasena_login").val();

  if (usuario == "" || contrasena == "") {
    
    Swal.fire({
      title: "Información",
      text: "Todos los campos son obligatorios",
      icon: "warning",
      confirmButtonText: "OK",
    });
  } else {
    if (usuario == "administrador" || contrasena == "1234") {
      $("#sp_loading").fadeIn();
      Swal.fire({
        title: "Información",
        text: "Ingresado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        window.location = "administrador.html";
      }, 3000);
    } else {
      $("#sp_loading").fadeIn();
      setTimeout(() => {
        Swal.fire({
          title: "Datos incorrectos",
          text: "",
          icon: "error",
          confirmButtonText: "OK",
        });
        $("#sp_loading").fadeOut();
      }, 3000);
    }
  }
}*/