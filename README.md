# 💈 BarberWise

**BarberWise** é um sistema web completo para barbearias, desenvolvido para gerenciar agendamentos, serviços e assinaturas de forma escalável e segura.  

---

## 🧠 Motivação

Com a demanda de barbearias por soluções online para agendamento e faturamento, criei o BarberWise para automatizar e otimizar a operação dessas empresas, oferecendo uma plataforma moderna e confiável tanto para clientes quanto para barbeiros.

---

## 🚀 Funcionalidades Principais

- Cadastro de clientes e barbeiros com autenticação JWT  
- Criação, edição e listagem de serviços de corte  
- Agendamento de horários com controle de disponibilidade  
- Painel administrativo para visualização e gestão de agendamentos  
- Sistema de assinaturas integradas com **Stripe API**  
- Webhooks para acompanhamento em tempo real de pagamentos  
- Persistência de dados com **Prisma + PostgreSQL**

---

## 🛠 Tecnologias Utilizadas

- **Front-end:** React, TypeScript, Styled Components  
- **Back-end:** Node.js, Express, Prisma ORM  
- **Banco de Dados:** PostgreSQL  
- **Pagamentos:** Stripe API  
- **Autenticação:** JWT  
- **Arquitetura:** Controllers → Services → Middlewares  
- **Boas práticas:** Clean Code, SOLID

---

## 📥 Instalação

1. Clone o repositório  
   ```bash
   git clone https://github.com/ism4jly/barberwise-web.git
