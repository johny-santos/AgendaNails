# 💅 AgendaNails

Aplicação mobile desenvolvida para auxiliar profissionais autônomos da área de beleza no **gerenciamento de clientes, serviços e agendamentos**.

O projeto foi desenvolvido pensando em uma profissional que realiza seus atendimentos de forma autônoma e precisava centralizar sua rotina em uma aplicação, substituindo o controle manual de clientes e horários.

> **Projeto desenvolvido como parte da minha formação em Análise e Desenvolvimento de Sistemas.**

---

## 📱 Sobre o projeto

O AgendaNails permite que a profissional organize sua agenda e mantenha as principais informações dos seus atendimentos em um único lugar.

A aplicação possui uma arquitetura composta por:

* **Aplicativo mobile** desenvolvido em React Native
* **API REST** desenvolvida em Node.js e Express
* **Banco de dados PostgreSQL**
* **Sequelize** para comunicação entre a API e o banco
* **JWT** para autenticação e controle de acesso

Além do desenvolvimento das telas, o projeto envolveu a definição da estrutura do banco de dados, relacionamento entre entidades, regras de negócio e comunicação entre o aplicativo e a API.

---

## ✨ Funcionalidades

### 🔐 Autenticação

* Login de profissional
* Cadastro
* Autenticação baseada em token JWT
* Controle de acesso às funcionalidades da aplicação

### 👤 Clientes

* Cadastro de clientes
* Visualização das informações dos clientes
* Organização dos dados utilizados durante os atendimentos

### 📅 Agendamentos

* Criação de agendamentos
* Visualização da agenda
* Associação entre cliente, profissional e serviço
* Controle do status do atendimento

### 💅 Serviços

* Cadastro e gerenciamento dos serviços oferecidos
* Associação de serviços aos agendamentos
* Controle dos serviços realizados em cada atendimento

### 📊 Dashboard

* Visão geral da agenda
* Informações relevantes para acompanhamento dos atendimentos

---

## 🧠 Regras de negócio

O projeto também possui regras específicas para o funcionamento dos agendamentos.

Entre elas:

* Agendamentos podem possuir diferentes status: `AGENDADO`, `REALIZADO`, `FALTOU` e `CANCELADO`
* Os atendimentos podem ser organizados em sessões semanais
* Um conjunto de sessões pode compartilhar o mesmo horário de atendimento
* Serviços são associados aos atendimentos
* É possível aplicar desconto aos atendimentos
* O sistema permite registrar se o pagamento foi realizado antecipadamente

Essas regras foram implementadas no backend para evitar que a aplicação dependesse apenas das validações realizadas no aplicativo mobile.

---

## 🛠️ Tecnologias

### Mobile

* React Native
* TypeScript
* Expo
* React Navigation

### Backend

* Node.js
* Express
* Sequelize
* JWT

### Banco de dados

* PostgreSQL

---

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura cliente-servidor:

```text
┌──────────────────────┐
│   React Native App   │
│      TypeScript      │
└──────────┬───────────┘
           │
           │ HTTP / REST API
           ▼
┌──────────────────────┐
│    Node.js + Express │
│        + JWT         │
└──────────┬───────────┘
           │
           │ Sequelize
           ▼
┌──────────────────────┐
│      PostgreSQL      │
└──────────────────────┘
```

O aplicativo mobile é responsável pela interface e interação com a profissional, enquanto a API concentra a lógica de negócio, autenticação e acesso aos dados.

---

## 📸 Screenshots

> Algumas telas da aplicação:

<img width="503" height="357" alt="image" src="https://github.com/user-attachments/assets/b0038dd2-4071-4d5d-8d94-90fd7db862c5" />

---

## 📂 Estrutura do projeto

### Mobile

```text
src/
├── assets/
├── components/
├── contexts/
├── routes/
└── screens/
    ├── Dashboard/
    ├── Home/
    ├── Login/
    ├── Clientes/
    └── Settings/
```

### Backend

```text
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── services/
└── config/
```

*A estrutura acima deve ser ajustada para refletir exatamente a estrutura atual do repositório.*

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre no diretório do projeto:

```bash
cd AgendaNails
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando o projeto

Inicie o projeto Expo:

```bash
npx expo start
```

Para executar no dispositivo físico, certifique-se de que o computador e o dispositivo estejam na mesma rede e que a API esteja configurada com o endereço IP correto.

---

## 🔧 Configuração da API

A aplicação mobile precisa estar configurada para acessar a API.

Exemplo:

```text
API_URL=http://SEU_IP:3000
```

Substitua `SEU_IP` pelo endereço IP da máquina onde o backend está sendo executado.

---

## 📚 O que este projeto representou

O AgendaNails foi um dos projetos em que pude trabalhar não apenas na construção de telas, mas também na **integração entre frontend, backend e banco de dados**.

Durante o desenvolvimento, tive contato com conceitos como:

* Arquitetura cliente-servidor
* APIs REST
* Autenticação com JWT
* Modelagem e relacionamento de dados
* ORM com Sequelize
* Desenvolvimento mobile com React Native
* TypeScript
* Implementação de regras de negócio

O projeto também foi importante para entender que desenvolver uma aplicação vai além de fazer as telas funcionarem: é necessário pensar na estrutura dos dados, nas regras do sistema e na comunicação entre suas diferentes partes.

---

## 📝 Licença

Este projeto está disponível sob a licença MIT.
