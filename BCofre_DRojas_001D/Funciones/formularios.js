
$(document).ready(function () {
    $("#Formulario").submit(function (event) {
        // Evitar que el formulario se envíe automáticamente
        event.preventDefault();

        // Realizar las validaciones
        var nombres = $("#inputNombres").val();
        var apellidos = $("#inputApellidos").val();
        var rut = $("#inputRut").val();
        var celular = $("#inputCelular").val();
        var correo = $("#inputEmail").val();
        var contraseña = $("#inputContraseña").val();
        var contraseña2 = $("#inputContraseña2").val();

        // Nombres, Apellidos: largo entre 3 y 20 caracteres
        if (nombre.length < 3 || nombre.length > 20 ||
            apellidoPaterno.length < 3 || apellidoPaterno.length > 20 ||
            apellidoMaterno.length < 3 || apellidoMaterno.length > 20) {
            alert("El Nombre y los Apellidos deben tener entre 3 y 20 caracteres.");
            return;
        }

        // Rut: largo entre 9 y 10 caracteres
        if (rut.length < 9 || rut.length > 10) {
            alert("El Rut debe tener entre 9 y 10 caracteres.");
            return;
        }

        // Contraseña: 
        if (contraseña === "") {
            alert("Agregue una contraseña")
            return
        }

        if (contraseña.length < 4 || contraseña.length > 20) {
            alert("Su contraseña debe tener entre 4 y 20 caracteres.");
            return;
        }

        // Confirmar contraseña: 
        if (contraseña2 === "") {
            alert("Confirme la contraseña")
            return
        }

        if (contraseña2 !== contraseña) {
            alert("Las contraseñas no son iguales")
            return
        }

        // Correo:
        if (correo === "") {
            alert("Por favor, ingrese un correo");
            return;
        }

        // Celular: 
        if (celular.length < 9 || celular.length > 12) {
            alert("El Celular debe tener entre 9 y 12 caracteres.");
            return;
        }

        if (celular[0, 1, 2] !== "+569") {
            alert("El formato debe ser +56 9 seguido de 8 dígitos.")
        }

        // Si todas las validaciones pasan, se puede enviar el formulario
        alert("¡Registro exitoso!");

    });
});