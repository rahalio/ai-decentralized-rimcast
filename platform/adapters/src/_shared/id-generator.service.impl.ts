/**
 * ID Generator Service Implementation — Rimcast prefixes.
 */

import type { DomainCode } from '@rimcast/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@rimcast/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@rimcast/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  mdlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.models);
  }
  capId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.capacity);
  }
  plcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.placements);
  }
  tlaId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.telemetry);
  }
  incId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.incidents);
  }
  govId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.governance);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
