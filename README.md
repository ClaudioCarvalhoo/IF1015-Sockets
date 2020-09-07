# Atividade Sockets
## Quais as principais dificuldades?
Em geral foi bem tranquilo, acho que o único aspecto que deu alguns problemas durante a implementação foi a questão de fechamento de conexão, seja pelo cliente ou pelo servidor. Para o servidor, adicionei um listener de conexão fechada para ele remover o devido socket da lista de envio. Para o cliente, adicionei uma função que fica tentando se reconectar assim que ele percebe que não está mais conectado com o servidor. 

## Quais as principais diferenças entre a implementação da questão 1 e da questão 2?
Como cada conexão na questão 1 já gerava seu próprio contexto dentro da função `handleConnection`, o servidor desde lá já suportava múltiplas conexões, elas só não se ligavam entre si. Desse modo, a diferença foi adicionar uma lista de sockets para que o servidor pudesse fazer o broadcast. Além disso, teve a questão dos nomes, que era um novo requisito do exercício 2. O escopo do `handleConnection`, para cada socket, guarda uma variável `name` que fica relacionada como sendo o nome utilizado pelo usuário conectado naquele socket.

## Como gerenciar as conexões entre clientes na questão 2?
Eu implementei uma lista com todos os sockets conectados, que é atualizada sempre que há uma nova conexão ou desconexão. Quando o servidor recebe uma mensagem de um dos sockets, ele envia aquela mesma mensagem para todos os sockets presentes na lista exceto aquele que foi o remetente original.

## Como identificar as mensagens e os remetentes para seguir a formatação do exemplo?
Na minha implementação optei por enviar as mensagens do servidor em um objeto JSON com os campos `name` e `message` para identificar o remetente e a mensagem. O cliente, por sua vez, tem a lógica de ler esse objeto e formatar para a mensagem no modelo `name: message`.
Para as mensagens que o cliente manda para o servidor, deixei como uma String normal mesmo pois o servidor sabe qual o nome relacionado a cada socket que se comunica com ele.

