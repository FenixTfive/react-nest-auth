import { LogLevel } from '../enums/LogLevel';

export interface ILogger {
    log(level: LogLevel, message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
}
