
var that = null ;
var vistaLibro = {

    init: function () {
        that = this ;
        that.consultarAutor();
        $('#btnGuardar').on('click', that.validarFormulario);

    },
    consultarAutor: function () {

        controlAutor.consultarAutor(null,that.cargarComboAutor);

    },
    cargarComboAutor:function(resultado){
       console.log(resultado);


        $('#cmbAutor').llenarCombo(resultado.data,'nombre','_id') ;


    },

    validarFormulario: function() {
        var contenedor = $('#formulario') ;
        var validacion = formularios.validarformulario(contenedor);
        if(validacion){
            that.guardarLibro();
        }

    },
    guardarLibro : function(data){
        var datos = {};
        datos.nombre = $('#txtNombre').val() ;
        datos.autor = $('#cmbAutor').val();
        datos.precio  = $('#txtPrecio').val();
        datos.portada = $('#txtPortada').val();
        datos.fechapublicacion = $('#txtFechaPublicacion').val();
        datos.editorial = $('#txtEditorial').val();
        datos.cantidadPaginas = $('#txtCantidadPaginas').val();
        console.log("datos a guardar");
        console.log(datos);
        controlLibro.guardarLibro(datos,that.procesarRespuesta);
    },
    consultarLibros : function(){

       controlLibro.consultarLibro(that.mostrarLibros);
    },
    mostrarLibros: function(respuesta){
        var source   = document.getElementById("template-libros").innerHTML;
        var renderFilas = Handlebars.compile(source);
        var filas= $('#tblLibros').find('tbody').empty()
            ///Render de las filas con Handlebars
        filas.append( renderFilas({libros:respuesta.data}) );
            console.log("cargando modal ");
        filas.find('button').on('click',that.mostrarModal);

    },

    mostrarModal : function(){

    },
    procesarRespuesta: function (data) {
       console.log("Resopuesta grabacion Libro");
       console.log(data);
        switch (data.codigo) {
            case 1 :
            case 2 :
                toastr.success(data.mensaje, 'Registro Exitoso');
                break;
            case -1 :
                toastr.warning(data.mensaje, 'Error');
                break;

        }


    }
};

