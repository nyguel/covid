$("#pacienteNome").on("input", function () {
  if (/[0-9]/g.test(this.value)) {
    var texto = $("#pacienteNome").val();
    $("#pacienteNome").val(texto.substring(0, texto.length - 1));
  }
});
$("#usuarioNome").on("input", function () {
  if (/[0-9]/g.test(this.value)) {
    var texto = $("#usuarioNome").val();
    $("#usuarioNome").val(texto.substring(0, texto.length - 1));
  }
});
$("#pacienteDestino").on("input", function () {
  if (/[0-9]/g.test(this.value)) {
    var texto = $("#pacienteDestino").val();
    $("#pacienteDestino").val(texto.substring(0, texto.length - 1));
  }
});

function ValidaData(data) {
  reg = /[^\d\/\.]/gi; // Mascara = dd/mm/aaaa | dd.mm.aaaa
  var valida = data.replace(reg, ""); // aplica mascara e valida só numeros
  if (valida && valida.length == 10) {
    // é válida, então ;)
    var ano = data.substr(6),
      mes = data.substr(3, 2),
      dia = data.substr(0, 2),
      M30 = ["04", "06", "09", "11"],
      v_mes = /(0[1-9])|(1[0-2])/.test(mes),
      v_ano = /(19[1-9]\d)|(20\d\d)|2100/.test(ano),
      rexpr = new RegExp(mes),
      fev29 = ano % 4 ? 28 : 29;

    if (v_mes && v_ano) {
      if (mes == "02") return dia >= 1 && dia <= fev29;
      else if (rexpr.test(M30)) return /((0[1-9])|([1-2]\d)|30)/.test(dia);
      else return /((0[1-9])|([1-2]\d)|3[0-1])/.test(dia);
    }
  }
  return alert("inválida"); // se inválida :(
}

function enviarBoletim() {
  const token = window.localStorage.getItem("token");
  const curados = $("#curados").val();
  const suspeitos = $("#suspeitos").val();
  const confirmados = $("#confirmados").val();
  const resultado = $("#resultado").val();
  $("#formBoletim").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("passei aqui");
    $.ajax({
      async: false,
      url: "http://localhost:3333/boletim",
      contentType: "application/json",
      cache: false,
      method: "POST",
      dataType: "json",
      data: JSON.stringify({
        confirmados: confirmados,
        suspeitos: suspeitos,
        resultado: resultado,
        curados: curados,
      }),
    });
  });
}
