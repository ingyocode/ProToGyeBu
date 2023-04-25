import 'source-map-support/register';
import { BootstrapConsole } from 'nestjs-console';
import { CliModule } from './cli.module';

const bootstrap = new BootstrapConsole({
    module: CliModule,
    useDecorators: true,
});

bootstrap.init().then(async (app) => {
    try {
        await app.init();
        console.time('Run Time');

        await bootstrap.boot();
        console.log('\nDone');

        const used = process.memoryUsage().heapUsed / 1024 / 1024;

        console.timeEnd('Run Time');
        console.log(`Memory usage ${Math.round(used * 100) / 100} MB`);
        await app.close();
    } catch (e) {
        console.error(e);
        await app.close();
        process.exit(1);
    }
});