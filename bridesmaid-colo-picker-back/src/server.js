import {app} from './app.js';

const port = process.env.PORT || 3005;
const server = app.listen(port,()=>{console.log(`Api is runnig on the port ${port}` )});

//kill the process
process.on('SIGINT',()=>{
    server.close();
    console.log(`  Port: ${port} has been closed `);
});