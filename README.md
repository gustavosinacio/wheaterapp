# wheaterapp

Desenvolvido com android API 29

---
## Estrutura

Todo o código criado nessa aplicação está contido dentro da past src, seguindo a seguinte estrutura:
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