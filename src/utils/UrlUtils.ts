class UrlHelper {
  static BuildUrl(base: string, data: object) {
    const query = new URLSearchParams();
    Object.keys(data).map((x) => {
      query.set(x, data[x]);
    });
    return `${base}?${query.toString()}`;
  }
}

export { UrlHelper };
