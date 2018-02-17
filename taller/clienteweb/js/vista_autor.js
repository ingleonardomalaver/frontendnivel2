var that = null;
/*
  Controla la vista del formulario de registro de Autores
 */
var vistaAutor = {

    init : function() {
        toastr.options.escapeHtml = true;
        that = this;
        that.cargarEventos();

    },
    cargarEventos: function(){
        console.log("cargando eventos");
        $('#btnGuardar').on('click',that.validaFormulario);
    },
    validaFormulario: function(){
        console.log("validando formulario")
        var contenedor = $('#formulario') ;
        var validacion = formularios.validarformulario(contenedor);
        if(validacion){
               that.guardarAutor();
        }

    },
    guardarAutor: function() {

        var datos= {};
        datos.nombre = $('#txtNombre').val();
        datos.foto = $('#txtFodo').val();
        datos.bioagrafia = $('#txtBiografia').text();
        datos.premios = $('#txtPremios').text();
        datos.fechanacimiento = $('#txtFechaNacimiento').val();
        datos.edad = $('#txtEdad').val();
        console.log(datos);
        controlAutor.grabarAutor(datos, that.procesarRespuesta);
    },

    procesarRespuesta : function(data){

        switch (data.codigo) {
            case 1:
                mensajes.alerta_toast('Respuesta ',data.mensaje,1) ;
                break;
            case -1:
                mensajes.alerta_toast('Error ',data.mensaje,-1) ;
                break;

        }

    }
};

vistaAutor.init();