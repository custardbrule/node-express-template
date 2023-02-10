import app from './app';

const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';
const port = process.env.PORT;

app.listen(port, () => {
  if (isDev) {
    // const url = `http://localhost:${port}/swagger`;
    // const start =
    //   process.platform == 'darwin'
    //     ? 'open'
    //     : process.platform == 'win32'
    //     ? 'start'
    //     : 'xdg-open';
    // child_process.exec(start + ' ' + url);
    console.log(`app listening on http://localhost:${port}`);
  } else console.log(`app listening on port ${port}`);
});
