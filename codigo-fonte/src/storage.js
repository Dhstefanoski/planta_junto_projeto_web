import { STATUS } from './constants.js'

const CHAVE = 'plantajunto:propostas'

const SEED = [
  {
    id: 1,
    cooperativa: 'Cooperativa Agrícola Vale Verde',
    cultura: 'Soja',
    quantidadeDesejada: 5000,
    quantidadeOfertada: 3200,
    precoPorSaca: 132.5,
    descricao: 'Compra de soja para exportação. Lote precisa ser fechado até o fim da safra.',
    status: STATUS.ABERTA,
    dataCriacao: '2026-05-12T10:00:00.000Z',
  },
  {
    id: 2,
    cooperativa: 'Coopergrãos',
    cultura: 'Milho',
    quantidadeDesejada: 8000,
    quantidadeOfertada: 8000,
    precoPorSaca: 78.9,
    descricao: 'Milho para ração animal. Lote já completo.',
    status: STATUS.FECHADA,
    dataCriacao: '2026-04-28T14:30:00.000Z',
  },
  {
    id: 3,
    cooperativa: 'Cooperativa Terra Boa',
    cultura: 'Trigo',
    quantidadeDesejada: 3000,
    quantidadeOfertada: 450,
    precoPorSaca: 95.0,
    descricao: 'Trigo para moagem. Aceita pequenos produtores da região.',
    status: STATUS.ABERTA,
    dataCriacao: '2026-06-05T09:15:00.000Z',
  },
]

function carregarBruto() {
  const dados = localStorage.getItem(CHAVE)
  if (dados === null) {
    localStorage.setItem(CHAVE, JSON.stringify(SEED))
    return [...SEED]
  }
  try {
    return JSON.parse(dados)
  } catch {
    localStorage.setItem(CHAVE, JSON.stringify(SEED))
    return [...SEED]
  }
}

function salvarBruto(propostas) {
  localStorage.setItem(CHAVE, JSON.stringify(propostas))
}

export function listarPropostas() {
  return carregarBruto().sort(
    (a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao),
  )
}

export function buscarProposta(id) {
  return carregarBruto().find((p) => p.id === id) || null
}

export function criarProposta(dados) {
  const propostas = carregarBruto()
  const novoId =
    propostas.length > 0 ? Math.max(...propostas.map((p) => p.id)) + 1 : 1

  const nova = {
    id: novoId,
    cooperativa: dados.cooperativa,
    cultura: dados.cultura,
    quantidadeDesejada: Number(dados.quantidadeDesejada),
    quantidadeOfertada: Number(dados.quantidadeOfertada) || 0,
    precoPorSaca: Number(dados.precoPorSaca),
    descricao: dados.descricao || '',
    status: dados.status || STATUS.ABERTA,
    dataCriacao: new Date().toISOString(),
  }

  propostas.push(nova)
  salvarBruto(propostas)
  return nova
}

export function atualizarProposta(id, dados) {
  const propostas = carregarBruto()
  const indice = propostas.findIndex((p) => p.id === id)
  if (indice === -1) return null

  propostas[indice] = {
    ...propostas[indice],
    cooperativa: dados.cooperativa,
    cultura: dados.cultura,
    quantidadeDesejada: Number(dados.quantidadeDesejada),
    quantidadeOfertada: Number(dados.quantidadeOfertada) || 0,
    precoPorSaca: Number(dados.precoPorSaca),
    descricao: dados.descricao || '',
    status: dados.status,
  }

  salvarBruto(propostas)
  return propostas[indice]
}

export function excluirProposta(id) {
  const propostas = carregarBruto().filter((p) => p.id !== id)
  salvarBruto(propostas)
}
