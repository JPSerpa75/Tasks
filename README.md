# Tasks
Aplicativo de tarefas para Android, desenvolvido usando ionic, com framework Angular.

O aplicativo está totalmente funcional e possui duas versões.

A 1° versão possui plugin com o storage, ou seja o usuário não vai perder seus dados 
ao reiniciar o aplicativo ou o telefone.

Já a 2° versão possui integração com o firebase, usando o firestore e o Firebase Authentication
disponibilizada pelo BaaS, logo o usuário tem a opção de fazer login, com o google ou facebook(
com o facebook só funciona para quem está no modo administrador).

- Para testar a versão com o plugin apenas baixe o APK AppTasks 1.0.

## Para testar o projeto com integração ao firebase será necessário:
1. Criar um projeto no Firebase;
2. Criar um aplicativo web dentro projeto, copiar as credenciais e colar em src/app/credentials.ts;
3. Configurar a autenticação com o Google e com o Facebook;
4. Configurar a Cloud Firestore como ambiente de teste.


#### Plugins instalados
```npm install firebase @angular/fire --save```
```npm install --save capacitor-firebase-auth```


#### Instalar Dependências do Projeto
```npm i```


#### Rodar o Projeto no Servidor de Teste Local do Ionic
```ionic serve```
