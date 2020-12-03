const amqp = require('amqplib/callback_api'); // importando biblioteca amqplib

amqp.connect('amqp://localhost:5672', function (err, conn) { // criando conexao com o rabbit
    conn.createChannel(function (err, ch) { // criando canal
        const nomeCanal = 'teste'; // nome canal
        const mensagem = 'Testando!'; // mensagem padrao a ser enviada
        ch.assertQueue(nomeCanal, { durable: false }); // passando o nome da fila para conexao com o rabbit     
        ch.sendToQueue(nomeCanal, new Buffer.from(mensagem)); //passando a mensagem para o buffer rabbit e para qual fila deve ser enviada
        console.log('-Enviado %s', mensagem);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});