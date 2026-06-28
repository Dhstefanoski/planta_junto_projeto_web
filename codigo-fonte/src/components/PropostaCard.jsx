import { STATUS } from '../constants.js'
import {
  formatarMoeda,
  formatarNumero,
  formatarData,
  calcularProgresso,
} from '../utils.js'

const CLASSE_STATUS = {
  [STATUS.ABERTA]: 'status-aberta',
  [STATUS.FECHADA]: 'status-fechada',
  [STATUS.CANCELADA]: 'status-cancelada',
}

export default function PropostaCard({ proposta, aoEditar, aoExcluir }) {
  const progresso = calcularProgresso(
    proposta.quantidadeOfertada,
    proposta.quantidadeDesejada,
  )
  const valorTotal = proposta.quantidadeDesejada * proposta.precoPorSaca

  return (
    <article className="card">
      <div className="card-topo">
        <div>
          <h3>{proposta.cultura}</h3>
          <p className="card-cooperativa">{proposta.cooperativa}</p>
        </div>
        <span className={`tag ${CLASSE_STATUS[proposta.status]}`}>
          {proposta.status}
        </span>
      </div>

      {proposta.descricao && <p className="card-descricao">{proposta.descricao}</p>}

      <div className="card-dados">
        <div>
          <span className="rotulo">Preço por saca</span>
          <strong>{formatarMoeda(proposta.precoPorSaca)}</strong>
        </div>
        <div>
          <span className="rotulo">Valor total do lote</span>
          <strong>{formatarMoeda(valorTotal)}</strong>
        </div>
      </div>

      <div className="card-progresso">
        <div className="progresso-texto">
          <span>
            {formatarNumero(proposta.quantidadeOfertada)} /{' '}
            {formatarNumero(proposta.quantidadeDesejada)} sacas
          </span>
          <span>{progresso}%</span>
        </div>
        <div className="barra">
          <div className="barra-preenchida" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      <div className="card-rodape">
        <span className="card-data">Criada em {formatarData(proposta.dataCriacao)}</span>
        <div className="card-botoes">
          <button className="botao botao-editar" onClick={() => aoEditar(proposta)}>
            Editar
          </button>
          <button className="botao botao-excluir" onClick={() => aoExcluir(proposta)}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  )
}
