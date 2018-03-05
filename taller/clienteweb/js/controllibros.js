var controlLibro = {

    guardarLibro:function(data,retorno){
        $.ajax({
            url:'http://localhost:5000/libros/registrar',
            type:'POST',
            data:data,
            dataType:'json',
            success:retorno,
            error:function (err) {
                if (err.readyState != undefined && err.readyState == 0)
                    mensajes.alerta_sw('Error', 'Servicio No Disponible');
            }
        });
    },
   consultarLibro:function(retorno){


       $.ajax({
           url:'http://localhost:5000/libros/consultar',
           type:'GET',
           dataType:'json',
           success:retorno,
           error: function (err) {
               if (err.readyState != undefined && err.readyState == 0)
                   mensajes.alerta_sw('Error', 'Servicio No Disponible');
           }
       });

   },
   consultaLibroConsola: function () {
       $.ajax({
           url:'http://localhost:5000/libros/consultar',
           type:'GET',
           dataType:'json',
           success:function(resultado){
               console.log(resultado);
           },
           error:function (err) {
               console.error(err);
           }
       });

    }

};

