import { LogLevel } from './enums/LogLevel';
import { ILogger } from './interfaces/ILogger';

export class Logger implements ILogger {
    log(level: LogLevel, message: string): void {
        switch (level) {
            case LogLevel.Error:
                console.error(message);
                break;
            case LogLevel.Debug:
                console.debug(message);
                break;
            case LogLevel.Info:
                console.info(message);
                break;
            case LogLevel.Warn:
                console.warn(message);
                break;
        }
    }
    debug(message: string): void {
        this.log(LogLevel.Debug, message);
    }

    warn(message: string): void {
        this.log(LogLevel.Warn, message);
    }

    error(message: string): void {
        this.log(LogLevel.Error, message);
    }

    info(message: string): void {
        this.log(LogLevel.Info, message);
    }
}
