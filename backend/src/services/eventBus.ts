import { EventEmitter } from 'events';
import { ParsedMessage } from '../types/whatsapp';
import { logger } from '../utils/logger';

export const EVENTS = {
  MESSAGE_RECEIVED: 'message:received',
  MESSAGE_PARSE_ERROR: 'message:parse_error',
  AGENT_REBALANCED: 'agent:rebalanced',
  PORTFOLIO_APY_CHANGED: 'portfolio:apy_changed',
} as const;

class MessageEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  emitMessage(message: ParsedMessage): void {
    logger.info(
      { from: message.from, message_id: message.message_id, type: message.type },
      'Emitting parsed WhatsApp message'
    );
    this.emit(EVENTS.MESSAGE_RECEIVED, message);
  }

  emitParseError(error: Error, rawPayload: unknown): void {
    logger.error({ error: error.message, rawPayload }, 'Message parse error');
    this.emit(EVENTS.MESSAGE_PARSE_ERROR, { error, rawPayload });
  }

  onMessage(handler: (message: ParsedMessage) => void): void {
    this.on(EVENTS.MESSAGE_RECEIVED, handler);
  }

  onParseError(handler: (data: { error: Error; rawPayload: unknown }) => void): void {
    this.on(EVENTS.MESSAGE_PARSE_ERROR, handler);
  }

  emitAgentRebalanced(userId: string, rebalanceData: any): void {
    logger.info({ userId, rebalanceData }, 'Emitting agent rebalanced event');
    this.emit(EVENTS.AGENT_REBALANCED, { userId, rebalanceData });
  }

  emitPortfolioApyChanged(userId: string, currentApy: number, originalApy: number): void {
    logger.info({ userId, currentApy, originalApy }, 'Emitting portfolio APY changed event');
    this.emit(EVENTS.PORTFOLIO_APY_CHANGED, { userId, currentApy, originalApy });
  }

  onAgentRebalanced(handler: (data: { userId: string; rebalanceData: any }) => void): void {
    this.on(EVENTS.AGENT_REBALANCED, handler);
  }

  onPortfolioApyChanged(handler: (data: { userId: string; currentApy: number; originalApy: number }) => void): void {
    this.on(EVENTS.PORTFOLIO_APY_CHANGED, handler);
  }
}

export const eventBus = new MessageEventBus();
