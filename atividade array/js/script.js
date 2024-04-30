var alunos = [] //simula um banco de dados em memoria 

//gurda o obejto que esta sendo alterado

var alunoAlterado = null

function cadastrar(){
    
    document.getElementById("ra").disabled = false
    alunoAlterado = null

mostrarModal()
limparForm()
 

}

function alterar(ra){

    for(let i = 0; i < alunos.length; i++){
        let aluno = alunos[i]
        if (aluno.ra == ra){
     
            document.getElementById("ra").value = aluno.ra;
            document.getElementById("nome").value = aluno.nome;
            document.getElementById("cidade").value = aluno.cidade;
            document.getElementById("estado").text = estado.options[estado.selectedIndex].text = aluno.estado;
            document.getElementById("curso").value = aluno.curso;
            alunoAlterado = aluno 
        }
    }


    document.getElementById("ra").disabled = true
    mostrarModal()
}


function excluir(ra){
    if(confirm("Você deseja realmente excluir?")){
      
        for(let i = 0; i < alunos.length; i++){
            let aluno = alunos[i]
            if (aluno.ra == ra){
   
                alunos.splice(i, 1)
            }
        }
    
    exibirDados()
    }

}

function mostrarModal(){
    let containerModal =  document.getElementById('container-modal')

    containerModal.style.display = "flex"
}

function ocultarModal(){
   
    let containerModal =  document.getElementById('container-modal')

    containerModal.style.display = "none"

}

function cancelar(){
   ocultarModal()
   limparForm()
}

function salvar(){
    let ra = document.getElementById("ra").value;
    let nome = document.getElementById("nome").value;
    let cidade = document.getElementById("cidade").value;
    let curso = document.getElementById("curso").value;

    let estado = document.getElementById("estado")
    estado = estado.options[estado.selectedIndex].text;

    

  
    if(alunoAlterado == null){

   

        let aluno = {


            "ra": ra,
            "nome": nome,
            "cidade": cidade,
            "estado": estado,
            "curso": curso
            
        
        }
        let validaCampos = validacaoCamposVazios(aluno);
        if(validaCampos.estaPreenchido) {
            if(window.confirm(validaCampos.menssagem)) {
                document.getElementById(validaCampos.campo).focus();
                return true;
            } else{
                ocultarModal();
            }

        } else {
            alunos.push(aluno);
        }
}else{
    alunoAlterado.ra = ra
    alunoAlterado.nome = nome
    alunoAlterado.cidade = cidade
    alunoAlterado.estado = estado
    alunoAlterado.curso = curso
}

alunoAlterado = null



    limparForm()

    ocultarModal()

   exibirDados()
   

        
    
}





function exibirDados(){ 
    let tbody = document.querySelector("#table-students tbody")
    tbody.innerHTML = ''

    for (let i = 0; i < alunos.length; i++) {
        let linha = `
                <tr>
                
                    <td >${alunos[i].ra}</td>
                    <td>${alunos[i].nome}</td>
                    <td>${alunos[i].cidade}</td>
                    <td>${alunos[i].estado}</td>
                    <td>${alunos[i].curso}</td>
                    <td>
                        <button id="form-button" onclick="alterar('${alunos[i].ra}')">Alterar</button>
                        <button id="form-button" onclick="excluir('${alunos[i].ra}')">Excluir</button>
                    </td>
                </tr>
        `
        let tr = document.createElement("tr")
        tr.innerHTML = linha

        tbody.appendChild(tr)
    }
}

function limparForm(){
    document.getElementById("ra").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("estado").value = estado.options[estado.selectedIndex].value = "";
    document.getElementById("curso").value = "";
    document.getElementById("cidade").value = "";
}

function validacaoCamposVazios(aluno) {
    if(aluno.ra === "") {
        return {
            campo: "ra",
            menssagem: "Preencha o campo RA",
            estaPreenchido: true
        }
    } else if (aluno.nome === "") {
        return {
            campo: "nome",
            menssagem: "Preencha o campo Nome",
            estaPreenchido: true
        }
    } else if (aluno.cidade === "") {
        return {
            campo: "cidade",
            menssagem: "Preencha o campo Cidade.",
            estaPreenchido: true
        }
    } 
    else if (aluno.estado === "Selecione o Estado") {
        return {
            campo: "estado",
            menssagem: "Preencha o campo Estado",
            estaPreenchido: true
        }
    } else if (aluno.curso === "") {
        return {
            campo: "curso",
            menssagem: "Preencha o campo Curso.",
            estaPreenchido: true
        }
    }  else {
        return {
            campo: "",
            menssagem: "",
            estaPreenchido: false
        }
    }
}