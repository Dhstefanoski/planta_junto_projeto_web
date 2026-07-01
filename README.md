# PlantaJunto

Plataforma de **venda coletiva de grãos** entre produtores rurais e cooperativas agrícolas. Trabalho Avaliativo do 2º Trimestre — implementação do fluxo **CRUD de Propostas**.

## Integrantes do Grupo

- Davi Henrique Stefanoski
- Leonardo Camilotto Cherini
- Enon Demori Todescatto Marques

## Sobre o Projeto

Muito produtor rural ainda vende sua safra sozinho — e, vendendo pouco de cada vez, acaba aceitando preços mais baixos. O **PlantaJunto** nasceu pra mudar isso: a ideia é juntar vários produtores numa mesma proposta de compra, formando lotes maiores e dando mais força de negociação a quem mais precisa, os pequenos e médios produtores.

Na prática, uma cooperativa publica uma **proposta de compra** dizendo qual cultura quer, quantas sacas precisa e quanto paga por saca. Os produtores então enxergam essas propostas e vão aderindo, até o lote fechar. Todo mundo sai ganhando: o produtor consegue um preço melhor e a cooperativa compra um grande volume de uma vez só.

Nesta segunda etapa do trabalho, a gente focou em deixar **completo o fluxo CRUD de Propostas** — que é o coração do sistema. Seguindo o que combinamos na Etapa 1, não tem backend: os dados ficam salvos no **`localStorage` do navegador**, simulando um banco de dados de verdade. Assim dá pra demonstrar a aplicação funcionando sem precisar de servidor.

> **Sobre as tecnologias:** mantivemos o **React** no frontend, como previsto na Etapa 1. O PostgreSQL listado lá não entrou nesta fase porque a própria proposta já dizia que usaríamos armazenamento local / dados simulados, sem backend obrigatório por enquanto.

## Tecnologias Utilizadas

- **React 18** (biblioteca de interface)
- **Vite** (ferramenta de build e dev server)
- **JavaScript (ES Modules)**
- **HTML5 / CSS3**
- **localStorage** (persistência dos dados no navegador)
- **Git / GitHub** (controle de versão)

## Funcionalidades Implementadas

O fluxo **CRUD de Propostas** está completo — dá pra criar, ver, editar e apagar propostas:

- **Criar (Create)** — cadastrar uma nova proposta de compra (cooperativa, cultura, quantidade desejada, quantidade já ofertada, preço por saca, status e descrição), com validação dos campos pra evitar dados errados.
- **Listar (Read)** — ver todas as propostas em cartões, com **busca** por cultura ou cooperativa e **filtro** por status (Aberta / Fechada / Cancelada).
- **Editar (Update)** — alterar os dados de uma proposta já cadastrada.
- **Excluir (Delete)** — remover uma proposta, sempre pedindo confirmação antes pra não apagar sem querer.

Além do CRUD, a gente colocou alguns extras pra deixar o sistema mais completo:

- Indicadores no topo (total de propostas, quantas estão abertas e o volume total negociado).
- Barra de **progresso do lote**, mostrando quanto já foi ofertado em relação ao desejado.
- Cálculo automático do valor total do lote.
- Layout responsivo, que funciona bem no computador e no celular.
- Alguns dados de exemplo já vêm carregados na primeira vez, pra não abrir a tela vazia.

## Instruções para Execução

Pré-requisitos: **Node.js 18+** instalado.

```bash
# 1. Entrar na pasta do código-fonte
cd codigo-fonte

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Depois, abrir no navegador o endereço exibido no terminal (por padrão `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve a versão de produção localmente
```

## Vídeo de Demonstração

https://www.youtube.com/watch?v=hTT0mxkGRw4

## Participação dos Integrantes

| Integrante | Atividades desenvolvidas |
|---|---|
| Davi Henrique Stefanoski | Estrutura e configuração do projeto (React + Vite), camada de persistência (localStorage) e integração do CRUD, deploy na Netlify. |
| Leonardo Camilotto Cherini | Formulário de propostas e validações, documento de requisitos e modelo de banco de dados, capturas de tela e vídeo de demonstração. |
| Enon Demori Todescatto Marques | Listagem, cards, indicadores e busca/filtro, estilização e identidade visual (CSS responsivo e logo), README e vídeo de demonstração. |

## Estrutura do Projeto

```
PlantaJunto/
├── codigo-fonte/          # Aplicação React (Vite)
│   ├── src/
│   │   ├── components/     # Componentes de UI (Modal, formulário, card)
│   │   ├── App.jsx         # Tela principal e orquestração do CRUD
│   │   ├── storage.js      # Camada de persistência (localStorage)
│   │   ├── constants.js    # Dados de apoio (culturas, cooperativas, status)
│   │   └── utils.js        # Funções de formatação
│   └── package.json
├── documentacao/          # Requisitos, modelo de banco e caracterização
├── evidencias/            # Capturas de tela
└── README.md
```
