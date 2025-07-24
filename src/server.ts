import { Server } from 'node:http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import seedSuperAdmin from './app/modules/DB';

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      // console.log(`server listening on port ${config.port}`);
    });
    await mongoose.connect(config.database_url as string, {
      autoIndex: true,
    });

    //this is for seed super admin:
    seedSuperAdmin();
  } catch {
    // console.log("this error from server:", error);
  }
}

main();

// handleError:
process.on('unhandledRejection', () => {
  // console.log("UnhandledPromiseRejection is deprecated, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  // console.log("UncaughtException is detected, shutting down...");
  process.exit(1);
});

export default app;
