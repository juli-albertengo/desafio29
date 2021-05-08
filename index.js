const express = require('express');
const cluster = require('cluster');
const app = express();

const numCPUs = require('os').cpus().length;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(cluster.isMaster) {
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {
    const PORT = parseInt(process.argv[2]) || 8080

    app.get('/', (req,res) => {
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.listen(PORT, err => {
        if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}

app.get('/info', (req, res)=> {
    res.json(numCPUs);
})
