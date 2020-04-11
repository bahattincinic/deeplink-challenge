import { createLogger, transports, format } from 'winston';

const customFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

export default createLogger({
  format: customFormat,
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});
