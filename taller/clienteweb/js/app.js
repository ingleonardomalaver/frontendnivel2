var mensajes = {

    /*
    titulo: Titulo del mensaje
   mensaje:  contenido del mensaje
   tipo ; 1 Sucees -1 Error
     */
    alerta_sw : function(titulo, mensaje,tipo  ) {

        switch (tipo) {
            case 1 :

                    swal
                        ({
                            title: titulo,
                            html: '<p class="text-left">' + mensaje + '</p>',
                            type: 'success'
                        });
                    break ;
            case -1 :

                 swal
                 ({
                     title: titulo,
                     html: '<p class="text-left">' + mensaje + '</p>',
                     type: 'warning'
                 });
                 break ;
        }
     } ,

    alerta_toast : function(titulo , mensaje,tipo ) {
        toastr.options.escapeHtml = true;
         console.log("alerta toast tipo :"+ tipo);
        switch(tipo){
            case 1 :
                toastr.success(mensaje, titulo);
                break;
            case -1 :
                toastr.success(mensaje, titulo);
                break;
        }

    },


};


var formularios = {

    validarformulario : function(contenedor){
        console.log("app: validando formulario")
        var requeridos = contenedor.find('*[required]');
        var mensaje = '';
        for (var i = 0; i < requeridos.length; i++) {
            var elementoJQuery = $(requeridos[i]);
            switch (elementoJQuery.prop('tagName')) {
                case 'INPUT':
                case 'TEXTAREA':
                    mensaje += formularios.validarInput(elementoJQuery);
                    break;
                case 'SELECT':
                    mensaje += formularios.validarSelect(elementoJQuery);
                    break;
            }
        }
        console.log("mensa de validacion:"+mensaje);
        if (mensaje.length > 0) {
            var data=[];
            data.codigo=-1 ;
            data.mensaje=mensaje;
            console.log(data);
            formularios.procesarRespuesta(data);
            return false ;
        }

        return true ;
    },

    obtenerLabel: function (elemento) {
        var txtLabel = elemento.parent().find('label[for="' + elemento.attr('id') + '"]').text();
        return txtLabel.substring(0, txtLabel.length - 1);
    },
    validarInput: function (elemento) {
        console.log('validando input');
        if (elemento.val().trim().length === 0) {
            elemento.addClass('is-invalid').removeClass('is-valid');
            return 'El campo <b>' + formularios.obtenerLabel(elemento) + '</b> está vacío. <br/>';
        }
        if (elemento.attr('pattern') !== null) {
            if (!new RegExp(elemento.attr('pattern')).test(elemento.val())) {
                elemento.addClass('is-invalid').removeClass('is-valid');
                return 'El campo <b>' + formularios.obtenerLabel(elemento) + '</b> no cumple. <br/>';
            }
        }
        elemento.removeClass('is-invalid').addClass('is-valid');
        return '';
    },
    validarSelect: function (elemento) {
        console.log('validando select');
        if (elemento.val() === '-1') {
            elemento.addClass('is-invalid').removeClass('is-valid');
            return 'Debe seleccionar una opción de ' + formularios.obtenerLabel(elemento) + '<br/>';
        }
        elemento.removeClass('is-invalid').addClass('is-valid');
        return '';
    },
    procesarRespuesta: function (data) {

           console.log("procesando respuesta");
           console.log(data) ;
            switch (data.codigo) {
                case 1 :
                  //  mensajes.alerta_toast('exitoso','Registro Exitoso',1);
                   mensajes.alerta_sw('Registro Exitoso',data.mensaje,1);
                    break;
                case -1 :
                  // mensajes.alerta_toast('error','Error' ,-1 );
                    mensajes.alerta_sw('Registro Exitoso',data.mensaje,-1);
                    break;

            }
        },
    limpiarFormulario:function(formulario){
    console.log("limpiando formulario");
    formulario.find('.is-valid, .is-invalid')
        .removeClass('is-invalid')
        .removeClass('is-valid');

    formulario.find('input[type="text"], textarea, input[type="email"]').val('');
    formulario.find('select').val('-1');
    formulario.find('input[type="radio"]').prop('checked', false); //Quita la seleccion de radios y checks
}

};
