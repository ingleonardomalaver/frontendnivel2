
var that=null;
var VistapaginaInicio ={

    init:function (){
        that=this ;
        controlLibro.consultarLibro(that.cargarTarjetasLibro);

    },
    cargarTarjetasLibro: function(resultado){$('div #div-plantilla').clone().removeAttr('hidden');
        var contenedor = $('div#contenedorTarjetas');
        contenedor.html('');

        sessionStorage.setItem('libros',JSON.stringify(resultado));

        for(let i=0; i<resultado.data.length;i++){
            let fila = $('div#div-plantilla').clone().removeAttr('hidden');
            let item = resultado.data[i];
            fila.attr('id',i);
            fila.attr('data-fila',item._id);
            fila.find('img').attr('src',item.portada);
            fila.find('.card-title').text('Nombre Libro'+ i + ';' + item.nombre);
            fila.find('.card-subtitle').text('Autor'+i+ ':'+ item.autor);
            fila.find('.card-footer').text('Portada'+i+':'+ item.portada);
            let botonDtalle =fila.find('.btn');
            botonDtalle.attr('id-libro',item._id);
            botonDtalle.on('click',that.renderizarDetalleLibro);
            let botonCompra = fila.find('.fa-shopping-cart') ;
            botonCompra.on('click', that.renderizarCompraLibro);
            contenedor.append(fila);

            fila =null ;

        }
    },
    renderizarDetalleLibro: function()  {
          let boton = $(this);
          let idLibro = $(this).parent().parent().attr('data-fila') ;
          console.log("id libro_________________ "+idLibro);
          sessionStorage.setItem('id_libro',idLibro);
          boton.attr("href","libro/consulta_detalle.html");
        //  boton.click();
    },
    renderizarCompraLibro: function(){
        let boton = $(this);
        let idLibro = $(this).parent().parent().attr('data-fila') ;
        console.log("id libro_a comprar "+idLibro);
        sessionStorage.setItem('id_libro',idLibro);
        boton.attr("href","libro/consulta_detalle_compras.html");

    }


};

VistapaginaInicio.init();