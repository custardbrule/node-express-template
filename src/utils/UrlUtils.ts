import child_process from 'child_process';

class UrlHelper {
  static BuildUrl(base: string, data: object) {
    const query = new URLSearchParams();
    Object.keys(data).map((x) => {
      query.set(x, data[x]);
    });
    return `${base}?${query.toString()}`;
  }

  static OpenBrowser(url: string) {
    const start =
      process.platform == 'darwin'
        ? 'open'
        : process.platform == 'win32'
        ? 'start'
        : 'xdg-open';
    child_process.exec(start + ' ' + url);
  }
}

export { UrlHelper };
