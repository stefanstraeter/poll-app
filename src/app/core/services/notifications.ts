import { signal, Service } from '@angular/core';

const DEFAULT_DURATION_MS = 1500;

@Service()
export class Notifications {
  message = signal<string | null>(null);

  show(message: string, durationMs = DEFAULT_DURATION_MS): void {
    this.message.set(message);
    setTimeout(() => this.message.set(null), durationMs);
  }
}
