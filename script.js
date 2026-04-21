var concluido = document.getElementById('tarefa'); // input para digitar a tarefa
var adicionar = document.getElementById('adicionar'); // botão de adicionar
var lista = document.getElementById('lista'); // ul

let appTarefas = {
    tarefas: [],
    adicionar: function(texto){
        if(texto.trim() === ""){
            alert("Digite uma tarefa!");
            return;
        }
            this.tarefas.push({
                texto: texto,
                concluido: false
            });

            localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
            this.renderizar();
        
    },
    renderizar: function(){
        lista.innerHTML = "";

        for(let i = 0; i < this.tarefas.length; i++){
            let item = this.tarefas[i];
            let li = document.createElement("li");

            let check = item.concluido? "✔️" : "✔";
            li.innerText = item.texto + " " + check;
            // tootip = (alt do HTML  = title no JS)
            li.title = item.concluido? "Marcar como concluído" : "Desmarcar como concluído";

            // click
            li.onclick = () => {
                item.concluido = !item.concluido;
                localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
                this.renderizar();
            }

            // btn Excluir tarefa:
            var btnRemover = document.createElement("button");
            btnRemover.innerText = "❌";
            btnRemover.title = "Excluir tarefa"

            btnRemover.onclick = () => {
                this.tarefas.splice(i, 1);
                localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
                this.renderizar();
            }

            // btn Editar tarefa:
            var btnEditar = document.createElement("button");
            btnEditar.innerText = "✏️";
            btnEditar.title = "Editar tarefa"

            btnEditar.onclick = () => {
                let novoTexto = prompt("Editar tarefa: ", this.tarefas[i].texto);

                if(novoTexto){
                    this.tarefas[i].texto = novoTexto;
                    localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
                    this.renderizar();
                }
            }
            // adicionar os botões de li (remover/editar):
            li.appendChild(btnEditar);
            li.appendChild(btnRemover);

            // depois adiconar o li:
            lista.appendChild(li);
        }
    }
}

let tarefasSalvas = localStorage.getItem("tarefas");

if(tarefasSalvas){
    appTarefas.tarefas = JSON.parse(tarefasSalvas);
}
appTarefas.renderizar();

// botão
adicionar.onclick = function(){
    var texto = concluido.value;
    appTarefas.adicionar(texto);
    concluido.value = "";
}

// Adicionar tarefa com ENTER

concluido.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        adicionar.click();
    }
});