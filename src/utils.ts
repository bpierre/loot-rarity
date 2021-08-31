let _warned = new Map();
export function warnDeprecatedName(oldName: string, newName: string): void {
  if (!_warned.get(oldName)) {
    console.warn(
      `${oldName} is deprecated and will be removed in a future version, please use ${newName} instead.`
    );
    _warned.set(oldName, true);
  }
}
