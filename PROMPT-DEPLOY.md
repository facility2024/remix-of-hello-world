# Prompt para Deploy Automático EasyPanel

Copie e cole este prompt em outros projetos quando quiser configurar deploy automático GitHub → EasyPanel:

---

## Prompt

```
Preciso configurar deploy automático do EasyPanel para atualizar o site toda vez que eu fizer push no GitHub.

Configuração do EasyPanel (já tenho o serviço criado):
- O repositório já está conectado no EasyPanel na aba "Github"
- O branch deve ser "master" (não "main")
- Tipo de construção: Dockerfile

O que preciso que você faça:

1. Criar/atualizar o Dockerfile para build e deploy no EasyPanel
2. Criar/atualizar o EASYPANEL.md com as instruções de deploy
3. A cada alteração que você fizer no código, fazer:
   - git add -A
   - git commit -m "descrição da alteração"
   - git push

Para o EasyPanel fazer deploy automático:
- O branch no EasyPanel deve estar como "master"
- Após o push, o EasyPanel detecta a mudança e faz deploy automático
- Se não funcionar automaticamente, clique em "Implantar" no EasyPanel

Sempre que terminar uma alteração, faça o push para o GitHub automaticamente.
```

---

## Como usar

1. Abra um novo projeto no OpenCode
2. Cole o prompt acima
3. O assistente vai configurar o Dockerfile e fazer os pushes automaticamente
4. No EasyPanel, configure o branch como "master"
5. Pronto! Toda alteração será deployada automaticamente

## Configuração inicial no EasyPanel

1. Crie o serviço como **App → Dockerfile**
2. Conecte o repositório GitHub
3. No campo **Ramo**, digite `master`
4. Porta: `3000`
5. Clique em **Salvar**

## Arquivos necessários

- `Dockerfile` — define como o site é buildado e rodado
- `EASYPANEL.md` — documentação do deploy
