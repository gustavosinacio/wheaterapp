# wheaterapp

Desenvolvido com android API 29. Não foi testado no iOS

---

## Para rodar a aplicação

1. Clone o repositório
2. Vá para o diretório clonado
3. Rode o comando `yarn` para instalar as dependências
4. Abra seu emulador Android (lembrando que a aplicação foi desenvolvida em um emulador android API 29. Para a melhor experiencia, utilize a mesma configuraçãp)
5. Rode `yarn android` para instalar o app de modo debug no emulador aberto.
6. Se o app não pedir automaticamente, vá até as autorizações do aplicativo e permita ao mesmo o uso da localização do dispositivo.

---

## Estrutura

* A tela *CurrentWeather* foi separada em alguns componentes para demonstrar uma forma de fazer a componentização local dos elementos
* Todo o código criado nessa aplicação está contido dentro da past src, seguindo a seguinte estrutura:
   - **assets**: aqui são mantidos arquivos como imagens ou códigos com variaveis globais da aplicação.
   - **components**: aqui estão os arquivos componentizados para reduzir acumulação de código em um só arquivo
   - **pages**: aqui ficam os arquivos que correspondem as telas da aplicação
   - **routes**: arquivos de rotas podem se tornar extensos, por isso é criada umas pasta apenas para mantê-los. Essa aplicação, por ser pequena, tem apenas o index.js
   - **services**: aqui são guardados arquivos de serviços, como urls utilizadas em requests, arquivos de autenticação, apis, etc.

 ---

## Bibliotecas

* **axios**
  - Biblioteca para fazer requests HTTP

* **date-fns**
  - Manipulação de datas

* **@react-native-community/geolocation**
  - A própria biblioteca recomenda o uso de outras bibliotecas de geolocalização
por serem mais rápidas, porém, eficiência não é prioridade neste app
  - O serviço de geolocalização faz o gerenciamento de quando a posição é atualizada,
assim, nem sempre ao atualizar a aplicação, serão retornado novos valores

* **react-native-vector-icons**
  - Uso de ícones para react native

* **styled-components**
  - Biblioteca que torna a componentização de componentes mais unificada entre
reactJS e react native

---
