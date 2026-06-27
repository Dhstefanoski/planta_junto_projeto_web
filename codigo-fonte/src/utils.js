export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatarNumero(valor) {
  return Number(valor).toLocaleString('pt-BR')
}

export function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function calcularProgresso(ofertada, desejada) {
  if (!desejada || desejada <= 0) return 0
  return Math.min(100, Math.round((ofertada / desejada) * 100))
}
