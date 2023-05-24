const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const json = [{
    nome: 'Ronald',
    idade: 19
  },
  {
    nome: 'Ronan',
    idade: 21
  }
  ,
  {
    nome: 'Galeno',
    idade: 32
  }
  ,
  {
    nome: 'Brito',
    idade: 10
  }
]
  //Lista
  const element = document.getElementById('lista')
  
  for (i = 0; i < json.length; i++) {
    element.innerHTML += `<p>${json[i].nome}</p>`
  }

  //Tabela
  const tabela = document.getElementById('nomes')

  for (i = 0; i < json.length; i++) {
    tabela.innerHTML += `
    <tr>
      <td>${json[i].nome}</td>
      <td>${json[i].idade}</td>
      </tr>
    `
  }
})

contextBridge.exposeInMainWorld('nome', (nome) => {
  // ipcRenderer.send('nome', nome)
  let meuNome = ipcRenderer.sendSync('nome', nome)

  document.getElementById('retornoInput').value = meuNome
})

contextBridge.exposeInMainWorld('problema', (Problema) => {
  let resultado = ipcRenderer.sendSync('problema', Problema)
  document.getElementById('retornoProblema').value = resultado
})