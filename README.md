# Nostalgia Challenge

## Requisitos

Para rodar o projeto localmente, será necessário:

-   [Node.js](https://nodejs.org/en/): v16.13.x
-   [Angular-CLI](https://cli.angular.io): v13.0.x

## Database e API REST

Para dispensar a necessidade de um banco de dados e uma API REST real, utilizei o JSON Server. Sendo assim, é importante rodar o JSON Server para o pleno funcionamento da aplicação.

### Instalando o JSON Server

Para instalar o JSON Server é simples, abra um terminal dentro do diretório backend_fake execute o comando:

```bash
npm install
```

### Executando o JSON Server

Para executar o JSON Server neste projeto, abra um terminal dentro do diretório backend_fake execute o comando:

```bash
npm run startDB
```

## FrontEnd Web

O diretório frontend_web contêm uma aplicação web desenvolvida com o framework [Angular](https://angular.io/). Esta aplicação seria consumida pelos administradores do sistema, possibilitando manipular as configurações e items da aplicação mobile.

### Instalando o projeto

Para instalar a aplicação web abra um terminal dentro do diretório frontend_web e execute o comando:

```bash
npm install
```

### Executando o projeto

Antes de executar a aplicação web é importante que o **backend_fake esteja em execução**.

Para executar o projeto, abra um terminal dentro do diretório frontend_web e execute o comando:

```bash
ng serve
```

### Dados de autenticação

Para se autenticar na aplicação utilize um dos usuários abaixo:

|  Usuário   |   Senha   |
| :--------: | :-------: |
| tglima.dev | sys.admin |

## Android APP

Dentro do diretório android_app será desenvolvido uma aplicação para dispositivos android (tablets e tv-box), onde qualquer pessoa com o aplicativo instalado poderá interagir com o jogo, mesmo estando offline.

## Licença

O código fonte das aplicações estão sob [Licença MIT](LICENSE).
