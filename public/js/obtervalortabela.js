function obterValor() {
  alert("passei");
  var getColumnValue = function (columnName, index) {
    var column = null;

    $("table th").each(function (index, item) {
      //encontra o index da coluna em causa
      column = $(item).text() == columnName ? index : column;
    });

    $("table tr").each(function (row, item) {
      if (row != index + 1) return; //salta se a linha nao for a desejada
      columnValue = $(item).find("td").eq(column); //pega a celula da tabela
    });

    return $(columnValue).text();
  };

  //index definido por numero
  $valor = $(".table td").eq(0).text();
  alert("resultado com index numérico = " + $valor);

  //index definido pelo nome da coluna
  $valor = getColumnValue("Firstname", 1); //alterado para chamar a função costumisada
  alert("resultado com o nome da coluna = " + $valor);
}
