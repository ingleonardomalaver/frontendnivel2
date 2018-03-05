var controlAutor = {

  grabarAutor: function (datos,retorno) {
      console.log('Control AUtor');
      console.log(datos);
      $.ajax({
          url:'http://localhost:5000/autores/registrar',
          type:'POST',
          data:datos,
          dataType:'json',
          success: retorno,
          error:function (err) {
              swal({
                  title:'Error Consultando Base de Datos',
                  html: '<p class="text-left">'+err+'</p>',
                  type: 'warning'
              });
          }
      });

     },
    consultarAutor: function(data ,retorno) {

    $.ajax({
        url: 'http://localhost:5000/autores/consultar',
        type: 'GET',
        dataType: 'json',
        success: retorno,
        error: function (err) {
            if(err.readyState != undefined && err.readyState ==0)
                mensajes.alerta_sw('Error','Servicio No Disponible') ;

        }
    });
}
};