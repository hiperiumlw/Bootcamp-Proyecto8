$('.formulario-recuperarcontrasenya').submit((event)=>{
    $('.alert-danger').remove();
    var contraseña = $('#contrasenya').val();
    var repetircontraseña = $('#repetir-contrasenya').val();
    if (contraseña!=repetircontraseña) {
        $('.formulario-recuperarcontrasenya').append('<div class="alert alert-danger">\n' +
            '  <strong>Error!</strong> Las contraseñas no coinciden.\n' +
            '</div>')
        event.preventDefault();
    } else {
        return;
    }
});