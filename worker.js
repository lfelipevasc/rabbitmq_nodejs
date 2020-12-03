const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const nomeCanal = 'teste';
        ch.assertQueue(nomeCanal, { durable: false });
        ch.prefetch(1);
        console.log('Esperando mensagens de %s.', nomeCanal);
        //escutando a fila da linha 5 e processando a mesma
        ch.consume(nomeCanal, function (mensagem) {
            console.log('-Recebido %s', mensagem.content.toString());
        }, { noAck: true });
    });
});