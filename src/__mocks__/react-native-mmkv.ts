const mockStorage = new Map<string, string>()

export const createMMKV = () => ({
  getString: (key: string) => mockStorage.get(key) ?? undefined,
  set: (key: string, value: string) => mockStorage.set(key, value),
  remove: (key: string) => mockStorage.delete(key),
})