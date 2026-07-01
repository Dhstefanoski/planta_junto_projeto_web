import { useEffect, useMemo, useState } from 'react'
import {
  listarPropostas,
  criarProposta,
  atualizarProposta,
  excluirProposta,
} from './storage.js'
import { LISTA_STATUS, STATUS } from './constants.js'
import { formatarMoeda } from './utils.js'
import PropostaCard from './components/PropostaCard.jsx'
import PropostaForm from './components/PropostaForm.jsx'
import Modal from './components/Modal.jsx'
import './App.css'

export default function App() {
  const [propostas, setPropostas] = useState([])
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('Todas')

  const [formAberto, setFormAberto] = useState(false)
  const [propostaEditando, setPropostaEditando] = useState(null)
  const [propostaExcluindo, setPropostaExcluindo] = useState(null)

  const [temaEscuro, setTemaEscuro] = useState(
    () => localStorage.getItem('plantajunto:tema') === 'escuro',
  )

  useEffect(() => {
    recarregar()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('tema-escuro', temaEscuro)
    localStorage.setItem('plantajunto:tema', temaEscuro ? 'escuro' : 'claro')
  }, [temaEscuro])

  function recarregar() {
    setPropostas(listarPropostas())
  }

  function salvar(dados) {
    if (propostaEditando) {
      atualizarProposta(propostaEditando.id, dados)
    } else {
      criarProposta(dados)
    }
    fecharForm()
    recarregar()
  }

  function confirmarExclusao() {
    excluirProposta(propostaExcluindo.id)
    setPropostaExcluindo(null)
    recarregar()
  }

  function abrirCriacao() {
    setPropostaEditando(null)
    setFormAberto(true)
  }

  function abrirEdicao(proposta) {
    setPropostaEditando(proposta)
    setFormAberto(true)
  }

  function fecharForm() {
    setFormAberto(false)
    setPropostaEditando(null)
  }

  const propostasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return propostas.filter((p) => {
      const correspondeBusca =
        !termo ||
        p.cultura.toLowerCase().includes(termo) ||
        p.cooperativa.toLowerCase().includes(termo)
      const correspondeStatus =
        filtroStatus === 'Todas' || p.status === filtroStatus
      return correspondeBusca && correspondeStatus
    })
  }, [propostas, busca, filtroStatus])

  const indicadores = useMemo(() => {
    const abertas = propostas.filter((p) => p.status === STATUS.ABERTA).length
    const volumeTotal = propostas.reduce(
      (soma, p) => soma + p.quantidadeDesejada * p.precoPorSaca,
      0,
    )
    return { total: propostas.length, abertas, volumeTotal }
  }, [propostas])

  return (
    <div className="app">
      <header className="cabecalho">
        <div className="cabecalho-conteudo">
          <div className="marca">
            <img src="/logo.png" alt="" className="logo" />
            <div>
              <h1>PlantaJunto</h1>
              <p>Venda coletiva de grãos · Gestão de Propostas</p>
            </div>
          </div>
          <div className="cabecalho-acoes">
            <button
              className="botao botao-tema"
              onClick={() => setTemaEscuro((v) => !v)}
              aria-label="Alternar tema claro ou escuro"
              title="Alternar tema claro/escuro"
            >
              {temaEscuro ? '☀️' : '🌙'}
            </button>
            <button className="botao botao-primario" onClick={abrirCriacao}>
              + Nova proposta
            </button>
          </div>
        </div>
      </header>

      <main className="conteudo">
        <section className="indicadores">
          <div className="indicador">
            <span className="indicador-valor">{indicadores.total}</span>
            <span className="indicador-rotulo">Propostas cadastradas</span>
          </div>
          <div className="indicador">
            <span className="indicador-valor">{indicadores.abertas}</span>
            <span className="indicador-rotulo">Propostas abertas</span>
          </div>
          <div className="indicador">
            <span className="indicador-valor">
              {formatarMoeda(indicadores.volumeTotal)}
            </span>
            <span className="indicador-rotulo">Volume total negociado</span>
          </div>
        </section>

        <section className="filtros">
          <input
            type="text"
            className="campo-busca"
            placeholder="Buscar por cultura ou cooperativa..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select
            className="campo-filtro"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="Todas">Todos os status</option>
            {LISTA_STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </section>

        {propostasFiltradas.length === 0 ? (
          <div className="vazio">
            <p>Nenhuma proposta encontrada.</p>
            <button className="botao botao-primario" onClick={abrirCriacao}>
              Criar a primeira proposta
            </button>
          </div>
        ) : (
          <section className="lista">
            {propostasFiltradas.map((proposta) => (
              <PropostaCard
                key={proposta.id}
                proposta={proposta}
                aoEditar={abrirEdicao}
                aoExcluir={setPropostaExcluindo}
              />
            ))}
          </section>
        )}
      </main>

      {formAberto && (
        <Modal
          titulo={propostaEditando ? 'Editar proposta' : 'Nova proposta'}
          aoFechar={fecharForm}
        >
          <PropostaForm
            propostaInicial={propostaEditando}
            aoSalvar={salvar}
            aoCancelar={fecharForm}
          />
        </Modal>
      )}

      {propostaExcluindo && (
        <Modal titulo="Confirmar exclusão" aoFechar={() => setPropostaExcluindo(null)}>
          <p className="texto-confirmacao">
            Tem certeza que deseja excluir a proposta de{' '}
            <strong>{propostaExcluindo.cultura}</strong> da cooperativa{' '}
            <strong>{propostaExcluindo.cooperativa}</strong>? Esta ação não pode ser
            desfeita.
          </p>
          <div className="acoes-formulario">
            <button
              className="botao botao-secundario"
              onClick={() => setPropostaExcluindo(null)}
            >
              Cancelar
            </button>
            <button className="botao botao-excluir" onClick={confirmarExclusao}>
              Excluir
            </button>
          </div>
        </Modal>
      )}

      <footer className="rodape">
        <p>
          PlantaJunto · Trabalho Avaliativo 2º Trimestre · Dados armazenados
          localmente no navegador (localStorage)
        </p>
      </footer>
    </div>
  )
}
