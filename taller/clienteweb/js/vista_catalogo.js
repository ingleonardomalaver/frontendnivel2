
var that=null;
var paginaInicio ={

    init:function (){
        that=this ;
        iniciar= this ;
        that.cargarTarjetasLibro();
        controlLibro.consultarLibro(that.cargarTarjetasLibro()r);

    },
    cargarTarjetasLibro: function(resultado){
        var contenedor = $('div #contenedorTarjetas');
        var template = $('div #div-plantilla').clone().removeAttr('hidden');

        for(var i=0; i<resultado.data.length,i++){
            var item = resultado.data[i];
            var fila = template;
            fila.find('. card-title').text(item.nombre);
            fila.find('. card-subtitle').text(item.autor);
            fila.find('. card-footer').text(item.portada);
            var botonDetalle =$('<button>') ;
            botonDetalle.on('click',that.cargarDetalleLibro);
            botonDetalle.text('Ver Detalle');
            fila.append(botonDetalle)
            contenedor.append(fila);
        }

        /*
         Consultar Libros Grabajados
         Instanciar el control de Libros
         */

    },
    cargarDetalleLibro: function () {


    }

};