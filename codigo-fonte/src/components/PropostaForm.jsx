import { useState } from 'react'
import { CULTURAS, COOPERATIVAS, LISTA_STATUS, STATUS } from '../constants.js'

const ESTADO_VAZIO = {
  cooperativa: '',
  cultura: '',
  quantidadeDesejada: '',
  quantidadeOfertada: '',
  precoPorSaca: '',
  descricao: '',
  status: STATUS.ABERTA,
}

export default function PropostaForm({ propostaInicial, aoSalvar, aoCancelar }) {
  const [form, setForm] = useState(
    propostaInicial
      ? {
          cooperativa: propostaInicial.cooperativa,
          cultura: propostaInicial.cultura,
          quantidadeDesejada: String(propostaInicial.quantidadeDesejada),
          quantidadeOfertada: String(propostaInicial.quantidadeOfertada),
          precoPorSaca: String(propostaInicial.precoPorSaca),
          descricao: propostaInicial.descricao,
          status: propostaInicial.status,
        }
      : ESTADO_VAZIO,
  )
  const [erros, setErros] = useState({})

  function alterar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function validar() {
    const novosErros = {}
    if (!form.cooperativa) novosErros.cooperativa = 'Selecione a cooperativa.'
    if (!form.cultura) novosErros.cultura = 'Selecione a cultura.'

    const qtd = Number(form.quantidadeDesejada)
    if (!form.quantidadeDesejada || qtd <= 0)
      novosErros.quantidadeDesejada = 'Informe uma quantidade maior que zero.'

    const oferta = Number(form.quantidadeOfertada)
    if (form.quantidadeOfertada && oferta < 0)
      novosErros.quantidadeOfertada = 'A quantidade ofertada não pode ser negativa.'
    if (form.quantidadeOfertada && qtd > 0 && oferta > qtd)
      novosErros.quantidadeOfertada =
        'A quantidade ofertada não pode ser maior que a desejada.'

    const preco = Number(form.precoPorSaca)
    if (!form.precoPorSaca || preco <= 0)
      novosErros.precoPorSaca = 'Informe um preço maior que zero.'

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  function enviar(e) {
    e.preventDefault()
    if (!validar()) return
    aoSalvar(form)
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <div className="campo">
        <label>Cooperativa *</label>
        <select
          value={form.cooperativa}
          onChange={(e) => alterar('cooperativa', e.target.value)}
        >
          <option value="">Selecione...</option>
          {COOPERATIVAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {erros.cooperativa && <span className="erro">{erros.cooperativa}</span>}
      </div>

      <div className="campo">
        <label>Cultura *</label>
        <select
          value={form.cultura}
          onChange={(e) => alterar('cultura', e.target.value)}
        >
          <option value="">Selecione...</option>
          {CULTURAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {erros.cultura && <span className="erro">{erros.cultura}</span>}
      </div>

      <div className="linha">
        <div className="campo">
          <label>Quantidade desejada (sacas) *</label>
          <input
            type="number"
            min="1"
            placeholder="Ex: 5000"
            value={form.quantidadeDesejada}
            onChange={(e) => alterar('quantidadeDesejada', e.target.value)}
          />
          {erros.quantidadeDesejada && (
            <span className="erro">{erros.quantidadeDesejada}</span>
          )}
        </div>

        <div className="campo">
          <label>Quantidade já ofertada (sacas)</label>
          <input
            type="number"
            min="0"
            placeholder="Ex: 1200"
            value={form.quantidadeOfertada}
            onChange={(e) => alterar('quantidadeOfertada', e.target.value)}
          />
          {erros.quantidadeOfertada && (
            <span className="erro">{erros.quantidadeOfertada}</span>
          )}
        </div>
      </div>

      <div className="linha">
        <div className="campo">
          <label>Preço por saca (R$) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex: 132.50"
            value={form.precoPorSaca}
            onChange={(e) => alterar('precoPorSaca', e.target.value)}
          />
          {erros.precoPorSaca && <span className="erro">{erros.precoPorSaca}</span>}
        </div>

        <div className="campo">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => alterar('status', e.target.value)}
          >
            {LISTA_STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="campo">
        <label>Descrição</label>
        <textarea
          rows="3"
          placeholder="Detalhes da proposta (opcional)"
          value={form.descricao}
          onChange={(e) => alterar('descricao', e.target.value)}
        />
      </div>

      <div className="acoes-formulario">
        <button type="button" className="botao botao-secundario" onClick={aoCancelar}>
          Cancelar
        </button>
        <button type="submit" className="botao botao-primario">
          {propostaInicial ? 'Salvar alterações' : 'Criar proposta'}
        </button>
      </div>
    </form>
  )
}
