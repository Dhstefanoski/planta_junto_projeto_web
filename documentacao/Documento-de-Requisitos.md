# Documento de Requisitos — PlantaJunto

Documento de requisitos referente ao escopo **implementado** nesta etapa (CRUD de Propostas).

## Objetivo do Sistema

O PlantaJunto é uma plataforma de **venda coletiva de grãos** que aproxima produtores rurais e cooperativas agrícolas. O objetivo do sistema é permitir que cooperativas cadastrem propostas de compra (informando cultura, quantidade desejada e preço por saca) e que vários produtores adiram a uma mesma proposta, formando lotes maiores e aumentando o poder de negociação — especialmente o dos pequenos e médios produtores.

Nesta etapa, o objetivo específico foi implementar de forma completa o **fluxo CRUD de Propostas** (criar, consultar, editar e excluir), utilizando armazenamento local (localStorage) para simular a persistência, conforme planejado na Etapa 1.

## Requisitos Funcionais (RF)

| Código | Requisito | Status |
|---|---|---|
| RF01 | O sistema deve permitir **cadastrar** uma nova proposta de compra, informando cooperativa, cultura, quantidade desejada, quantidade ofertada, preço por saca, status e descrição. | Implementado |
| RF02 | O sistema deve permitir **listar** todas as propostas cadastradas. | Implementado |
| RF03 | O sistema deve permitir **editar** os dados de uma proposta existente. | Implementado |
| RF04 | O sistema deve permitir **excluir** uma proposta, exigindo confirmação do usuário. | Implementado |
| RF05 | O sistema deve **validar** os campos obrigatórios e impedir valores inválidos (ex.: quantidade ou preço menores ou iguais a zero; quantidade ofertada maior que a desejada). | Implementado |
| RF06 | O sistema deve permitir **buscar** propostas por cultura ou cooperativa. | Implementado |
| RF07 | O sistema deve permitir **filtrar** propostas por status (Aberta, Fechada, Cancelada). | Implementado |
| RF08 | O sistema deve exibir o **progresso do lote** (quantidade ofertada em relação à desejada). | Implementado |
| RF09 | O sistema deve exibir **indicadores** gerais (total de propostas, propostas abertas e volume total negociado). | Implementado |
| RF10 | O sistema deve **persistir** os dados entre sessões do navegador. | Implementado (localStorage) |

## Requisitos Não Funcionais (RNF)

| Código | Requisito |
|---|---|
| RNF01 | A aplicação deve ser desenvolvida em **React**. |
| RNF02 | A interface deve ser **responsiva**, adaptando-se a telas de desktop e celular. |
| RNF03 | Os dados devem ser armazenados **localmente no navegador** (localStorage), sem dependência de backend. |
| RNF04 | A aplicação deve funcionar nos navegadores modernos (Chrome, Edge, Firefox). |
| RNF05 | A interface deve estar em **português (pt-BR)**, incluindo formatação de moeda (R$) e datas. |
| RNF06 | O código deve ser organizado em **componentes reutilizáveis** e em camadas (UI, persistência, utilitários). |
| RNF07 | A aplicação deve fornecer **feedback** ao usuário em validações e na confirmação de exclusão. |
