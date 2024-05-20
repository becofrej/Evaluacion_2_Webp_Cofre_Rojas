
$(document).ready(function () {
    $("#formulario").submit(function (event) {
        // Evitar que el formulario se envíe automáticamente
        event.preventDefault();

        // Realizar las validaciones
        var nombres = $("#inputNombres").val();
        var apellidos = $("#inputApellidos").val();
        var rut = $("#inputRut").val();
        var celular = $("#inputCelular").val().replace(/\s/g, '');
        var correo = $("#inputEmail").val();
        var contraseña = $("#inputContraseña").val();
        var contraseña2 = $("#inputContraseña2").val();

        // Nombres, Apellidos: largo entre 3 y 20 caracteres
        if (nombres.length < 3 || nombres.length > 20 ||
            apellidos.length < 3 || apellidos.length > 20) {
            alert("El Nombre y los Apellidos deben tener entre 3 y 20 caracteres.");
            return;
        }

        // Rut:
        if (!validarRUT(rut)) {
            alert("El RUT ingresado no es válido.");
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

        // Validar formato de correo:
        if (!validarEmail(correo)) {
            alert("Por favor, ingrese un correo válido");
            return;
        }

        // Celular: 
        if (!/^(\+56)?9\d{8}$/.test(celular)) {
            alert("El formato del celular debe ser +569 seguido de 8 dígitos.");
            return;
        }

        // Si todas las validaciones pasan, se puede enviar el formulario
        alert("¡Registro exitoso!");

        // Reiniciar campos del formulario
        this.reset();

    });

    function validarRUT(rut) {
        // Eliminar puntos y guión
        rut = rut.replace(/\./g, '').replace(/-/g, '');

        // Validar formato básico
        if (!/^\d{7,8}[0-9Kk]$/.test(rut)) {
            return false;
        }

        // Separar cuerpo y dígito verificador
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1).toUpperCase();

        // Calcular dígito verificador
        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += multiplo * parseInt(cuerpo.charAt(i));
            multiplo = (multiplo < 7) ? (multiplo + 1) : 2;
        }

        let dvEsperado = 11 - (suma % 11);
        dvEsperado = (dvEsperado === 11) ? '0' : (dvEsperado === 10) ? 'K' : dvEsperado.toString();

        // Comparar dígito verificador
        return dv === dvEsperado;
    }

    function validarEmail(email) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

});