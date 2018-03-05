
var that = null ;
var vistaLibro = {

    init: function () {
        that = this ;
        that.consultarAutor();
        $('#btnGuardar').on('click', that.validarFormulario);
        $('#btnLimpiar').on('click',that.inicializaFormulario) ;
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
       // console.log("datos a guardar");
      //  console.log(datos);
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
        filas.find('button').on('click',that.mostrarModal);

    },

    mostrarModal : function(){

    },
    procesarRespuesta: function (data) {
        switch (data.codigo) {
            case 1 :
            case 2 :
                toastr.success(data.mensaje, 'Registro Exitoso');
                break;
            case -1 :
                toastr.warning(data.mensaje, 'Error');
                break;

        }


    },
    cargadetalleLibro : function() {

        var idLibro = sessionStorage.getItem('id_libro');
        console.log("id libro"+ idLibro);
        var libros = [];
        console.log("Cargando libros desde sesionstorage");

        libros = JSON.parse(sessionStorage.getItem('libros'));
        console.log(libros);
        for (var ind=0; ind<libros.data.length;ind++){
            var item = libros.data[ind];
           // console.log(item);
            if(item._id == idLibro) {
                let divDetalle = $('#div-detalle');
                divDetalle.find('.img-fluid').attr('src',item.portada) ;
                divDetalle.find('.card-title').text(item.nombre);



                console.log("Libro encontrado:");
                console.log(item);
                return;

            }
        }
    },
    inicializaFormulario: function(){
       formularios.limpiarFormulario($('#formulario'));

    },
    consultaInfoLibro : function(idLibro ){
        libros = JSON.parse(sessionStorage.getItem('libros'));
        console.log(libros);
        for (var ind=0; ind<libros.data.length;ind++){
            var item = libros.data[ind];
            if(item._id == idLibro) {
                return item;
            }
        }


    },

    carritoCompras: function (accion){
        console.log("accion :"+ accion);
        var idLibroComprar = sessionStorage.getItem('id_libro');
        var librosCarrito = JSON.parse(sessionStorage.getItem('librosCarrito'));
        console.log(librosCarrito);
        var itemGrabar = {};
        itemGrabar._id = idLibroComprar;
        itemGrabar.cantidad = 1;
        console.log(itemGrabar);

        if(librosCarrito != null ) {
            var bandera_encontrado= 0 ;
            for (let ind = 0; ind < librosCarrito.length; ind++) {

                let item = librosCarrito[ind];
                console.log("Libro en carrito ");
                console.log(item);
                if (item._id == idLibroComprar) {
                    if (accion == '+'){
                        item.cantidad = item.cantidad + 1; }
                    if (accion == '-'){
                        item.cantidad = item.cantidad - 1;}

                    console.log("Libro encontrado Actualizar Cantidad:");
                    console.log(item);
                    librosCarrito.splice(ind,1);

                    if(item.cantidad>0) {
                      librosCarrito.push(item);}

                    bandera_encontrado= 1 ;
                    break ;
                }
            }
            if(bandera_encontrado==0){
                  console.log("Libro nuevo a registrar")
                  librosCarrito.push(itemGrabar);
            }
        }
        else {
            console.log("NO HA HECHO COMPRAS ADICIONAR NUEVO LIGRO");
            librosCarrito=[];
            librosCarrito.push(itemGrabar);
              }
         sessionStorage.setItem('librosCarrito', JSON.stringify(librosCarrito));
         vistaLibro.mostrarDetalleLibroCompras();

    } ,
    mostrarDetalleLibroCompras : function (){
        var contenedor = $('#listadoCompras');
        contenedor.html('');
        var librosCarrito = JSON.parse(sessionStorage.getItem('librosCarrito'));
        console.log(librosCarrito);

        for (let ind = 0; ind < librosCarrito.length; ind++) {
            let item = librosCarrito[ind];
            console.log(item +" INDICE: " +ind);
            let infoLibroComprar= vistaLibro.consultaInfoLibro(item._id);
            console.log(infoLibroComprar);
            var divDetalle = $('#div-detalle').clone().removeAttr('hidden');
            divDetalle.attr('id',"div"+ind);
            divDetalle.attr('data-fila',item._id);
            divDetalle.find('.img-fluid').attr('src', infoLibroComprar.portada);
            divDetalle.find('.card-title').text(infoLibroComprar.nombre);
            divDetalle.find('#cantidad').val(item.cantidad);
            divDetalle.find('#sumar').on('click', vistaLibro.carritoComprasEditar);
            divDetalle.find('#restar').on('click', vistaLibro.carritoComprasEditar);
            console.log(divDetalle);
            contenedor.append(divDetalle);
        }

    },
    carritoComprasEditar: function(){
        let boton= $(this);
        let opcion= boton.text();
        console.log("opcion seleccionada: "+ opcion);
        let idLibro = boton.parent().parent().attr('data-fila') ;
        console.log("id libro a Editar "+idLibro);
        sessionStorage.setItem('id_libro',idLibro);
        vistaLibro.carritoCompras(opcion);
    }

};
