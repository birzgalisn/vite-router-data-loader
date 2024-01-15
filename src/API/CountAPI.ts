class CountAPI {
  private fetchCount({
    data,
    searchParam,
    delay,
  }: {
    data: string;
    searchParam: keyof RootData;
    delay: number;
  }): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        console.info(`CountAPI.${searchParam} ${data || "0"}`);
        resolve(data || "0");
      }, delay);
    });
  }

  public fetchSlowCount(data: string): Promise<string> {
    return this.fetchCount({ data, searchParam: "slowCount", delay: 2000 });
  }

  public fetchFastCount(data: string): Promise<string> {
    return this.fetchCount({ data, searchParam: "fastCount", delay: 500 });
  }
}

export default new CountAPI();
