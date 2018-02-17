var controlLibro = {

    guardarLibro:function(data,retorno){
        $.ajax({
            url:'http://localhost:5000/libros/registrar',
            type:'POST',
            data:{
                nombre:$('#txtNombreLibro').val() ,
                autor:$('#cmbAutor').val(),
                precio:$('#txtPrecio').val(),
                portada:$('#txtPortada').val()
            },
            dataType:'json',
            success:retorno,
            error:function (err) {
                console.error(err);
            }
        });
    },
   consultarLibro:function(retorno){


       $.ajax({
           url:'http://localhost:5000/libros/consultar',
           type:'GET',
           dataType:'json',
           success:retorno,
           error:function (err) {
               console.error(err);
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
