const modoInicio = process.argv[3];

if(modoInicio === 'CLUSTER') {
    console.log(`Master ${process.pid} is running`);

    const portNumber = process.argv[2] || 8080;

    app.get('/', (req, res) => {
        res.send(`App running en ${portNumber} => process: ${process.pid}`)
    })


} else if(modoInicio === 'FORK' || !modoInicio){

    if(cluster.isMaster) {
        cluster.fork();
    } else {
        const portNumber = process.argv[2] || 8080;
    
        app.get('/', (req, res) => {
            res.send(`App running en ${portNumber} => process: ${process.pid}`)
        })
        
    }

}