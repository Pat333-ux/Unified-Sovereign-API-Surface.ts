/**
 * Unified-Sovereign-API-Surface
 *
 * Controlled external interface for Beast System 3.0.
 * Provides safe access to organism state, telemetry, continuity,
 * and governance signals without violating sovereign constraints.
 */

import {
  UnifiedSovereignRuntimeIgnition,
} from './Unified-Sovereign-Runtime-Ignition';

import {
  UnifiedSovereignDashboardUI,
} from './Unified-Sovereign-Dashboard-UI';

export interface SovereignAPIResponse<T> {
  ok: boolean;
  timestamp: number;
  data?: T;
  error?: string;
}

export class UnifiedSovereignAPISurface {
  constructor(
    private readonly runtime: UnifiedSovereignRuntimeIgnition,
    private readonly dashboard: UnifiedSovereignDashboardUI,
  ) {}

  /**
   * Retrieve the unified organism state.
   */
  getOrganismState(): SovereignAPIResponse<any> {
    const state = this.runtime.getState();
    if (!state) {
      return {
        ok: false,
        timestamp: Date.now(),
        error: 'Organism not active',
      };
    }

    return {
      ok: true,
      timestamp: Date.now(),
      data: state,
    };
  }

  /**
   * Retrieve the latest dashboard snapshot.
   */
  getDashboardSnapshot(): SovereignAPIResponse<any> {
    const snapshot = this.dashboard.getSnapshot();
    if (!snapshot) {
      return {
        ok: false,
        timestamp: Date.now(),
        error: 'No dashboard snapshot available',
      };
    }

    return {
      ok: true,
      timestamp: Date.now(),
      data: snapshot,
    };
  }

  /**
   * Controlled governance signal.
   * (Does not mutate sovereign identity or core engines.)
   */
  sendGovernanceSignal(signal: string): SovereignAPIResponse<string> {
    return {
      ok: true,
      timestamp: Date.now(),
      data: `Governance signal received: ${signal}`,
    };
  }
}
