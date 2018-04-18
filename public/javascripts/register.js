$('.formulario-registro').submit((event)=>{
    $('.alert-danger').remove();
    var contraseña = $('#contrasenya').val();
    var repetircontraseña = $('#repetir-contrasenya').val();
    if (contraseña!=repetircontraseña) {
        $('.formulario-registro').append('<div class="alert alert-danger">\n' +
            '  <strong>Error!</strong> Las contraseñas no coinciden.\n' +
            '</div>')
        event.preventDefault();
    } else {
        return;
    }
});