class SearchParamsCache {
  private cache = new Map<keyof RootData, string>();

  public clear(): void {
    this.cache.clear();
  }

  public set(key: keyof RootData, value: string): void {
    this.cache.set(key, value);
  }

  public async onDifferent(
    url: string,
    searchParam: keyof RootData,
    fetchFn: (data: string) => Promise<string>
  ) {
    const value = new URL(url).searchParams.get(searchParam) ?? "0";

    if (!this.cache.has(searchParam) || this.cache.get(searchParam) !== value) {
      this.cache.set(searchParam, await fetchFn(value));
    }

    return Promise.resolve(this.cache.get(searchParam));
  }
}

export default new SearchParamsCache();
