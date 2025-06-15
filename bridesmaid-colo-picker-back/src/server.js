import { app } from './app.js';
import sequelize from './config/dbConnection.js';
import "./models/index.js";

const port = process.env.PORT || 3005;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');

         await sequelize.sync();
        console.log('✅ Database synchronized successfully!');
        
        const server = app.listen(port, () => {
            console.log(`🚀 API is running on port ${port}`);
        });
        
        process.on('SIGINT', () => {
            server.close();
            console.log(`📴 Port: ${port} has been closed`);
            process.exit(0);
        });
        
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
        process.exit(1);
    }
}

// Iniciar tudo
startServer();