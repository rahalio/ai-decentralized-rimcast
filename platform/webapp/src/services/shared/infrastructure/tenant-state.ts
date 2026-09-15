export function getEffectiveOrgId(): string {
  return localStorage.getItem('rimcast.tenantId') || 'tnt_demo';
}
