export default function Modal({ titulo, children, aoFechar }) {
  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-cabecalho">
          <h2>{titulo}</h2>
          <button className="botao-fechar" onClick={aoFechar} aria-label="Fechar">
            ×
          </button>
        </div>
        <div className="modal-corpo">{children}</div>
      </div>
    </div>
  )
}
