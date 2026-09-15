/**
 * IdGeneratorService Port — Rimcast domain prefixes.
 */

import type { DomainCode } from '@rimcast/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  mdlId(): string;
  capId(): string;
  plcId(): string;
  tlaId(): string;
  incId(): string;
  govId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
