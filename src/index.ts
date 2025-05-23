import Express, {Request, Response} from 'express';

const app = Express();
const port = 3000;

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})