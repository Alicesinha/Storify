# EcommerceApp

Aplicativo mobile de e-commerce desenvolvido em React Native CLI.

## Como executar

### Pré-requisitos

- Node.js >= 18
- JDK 17
- Android Studio + emulador configurado
- React Native CLI

### Instalação
```bash
# Clone o repositório
git clone https://github.com/alicesinha/EcommerceApp.git
cd EcommerceApp

# Instale as dependências
npm install
```

### Executando
```bash
# Inicie o Metro
npm start

# Em outro terminal, rode no Android
npm run android
```

> ⚠️ O primeiro build pode demorar alguns minutos devido à compilação
> das dependências nativas (Reanimated, MMKV). Builds subsequentes são
> significativamente mais rápidos.

### Testes
```bash
npm test
```

---

## Arquitetura
```
src/
├── modules/
│   ├── products/       # Listagem e detalhe de produtos
│   ├── cart/           # Carrinho de compras
│   └── checkout/       # Checkout via WebView
├── shared/
│   ├── components/     # Componentes reutilizáveis
│   ├── hooks/          # Hooks compartilhados
│   ├── services/       # HTTP client
│   ├── store/          # Cache de produtos
│   └── logger/         # Logger estruturado
├── native/
│   └── BatteryModule/  # Ponte JS para módulo nativo
└── navigation/         # Navegação (Stack + Bottom Tabs)
```

---

## Decisões técnicas

### Gerenciamento de estado
- **Zustand** — escolhido pela ausência de boilerplate, API simples
  e possibilidade de acessar o estado fora de componentes
- **MMKV** — storage síncrono 10x mais rápido que AsyncStorage,
  usado para persistir o cache de produtos

### Cache offline (Stale-While-Revalidate)
- Produtos em cache são exibidos imediatamente
- Atualização em background quando o cache expira (5 min)
- Detalhe do produto também é cacheado — exibição instantânea
  mesmo offline após primeira visita

### WebView + Checkout
- HTML bundled no app para o formulário funcionar offline
- Confirmação do pagamento bloqueada sem conexão — comportamento
  intencional equivalente a apps reais de e-commerce
- Comunicação bidirecional via `postMessage` com eventos tipados
- Busca de endereço via ViaCEP ao digitar o CEP
- No Android o HTML é servido via `file:///android_asset/`
  para compatibilidade com arquivos locais

### Módulo nativo de bateria
- **Android**: `BroadcastReceiver` com `ACTION_BATTERY_CHANGED`
- **iOS**: `NotificationCenter` com `batteryLevelDidChangeNotification`
- Listener de evento em vez de polling — sem consumo desnecessário
- `startBatteryListener`/`stopBatteryListener` para ciclo de vida
  correto sem memory leak

### Resiliência
- Axios com interceptor de retry (3 tentativas, delay crescente)
- Cache offline para listagem e detalhe de produtos
- Estados de loading, erro e offline em todas as telas
- Banner amarelo quando offline

### Logger estruturado
- Todos os eventos logados em JSON com timestamp e nível
- Eventos da WebView logados com direção (APP→WEB / WEB→APP)

---

## Diferenciais implementados

- [x] TypeScript em todo o projeto
- [x] Testes automatizados (17 testes)
- [x] Cache avançado com Stale-While-Revalidate
- [x] Padronização de eventos entre app e WebView
- [x] Logs e debug estruturado

---

## Possíveis melhorias

- Testes de integração com Detox
- Implementar módulo de bateria para iOS com testes em device real
- Adicionar animações de transição entre telas
- Implementar busca e filtro de produtos
- Paginação na listagem de produtos
- Internacionalização (i18n)
- CI/CD com GitHub Actions + EAS Build