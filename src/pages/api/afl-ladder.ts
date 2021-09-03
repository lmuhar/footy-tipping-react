import { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import { IAFLLadder } from '../../models/afl-ladder.model';
import to from 'await-to-js';
import Axios from 'axios';

// Creating a service to do the actual logic
// You can also import this from a page component and use in `getServerSideProps` !
// Also created a [err, res] pattern for the service!
export async function aflLadderService(): Promise<[Error, IAFLLadder[]]> {
  // Lets use Axios! Because it's juicy
  const [err, res] = await to(Axios.get<string>('http://www.fanfooty.com.au/game/ladder.php'));

  // Something bad happened, lets return the error!
  if (err) return [new Error("Something wen't wrong fetching the AFL Ladder"), null];

  // The response data is the HTML document. We can use it straight up!
  const htmlString = await res.data;
  const $ = cheerio.load(htmlString);

  // Alrighty, getting into the good stuff!
  const list: IAFLLadder[] = [];

  // Cheerio old chap!
  $('table')
    .find('tr')
    .each((i: any, elem: any) => {
      const data: IAFLLadder = { order: 0 };
      $(elem)
        .find('td')
        .each((t: any, element: any) => {
          data.order = i;
          if (t === 0) {
            data.name = $(element).text();
          } else if (t === 1) {
            data.played = $(element).text();
          } else if (t === 2) {
            data.wins = $(element).text();
          } else if (t === 3) {
            data.draw = $(element).text();
          } else if (t === 4) {
            data.loss = $(element).text();
          } else if (t === 5) {
            data.for = $(element).text();
          } else if (t === 6) {
            data.agt = $(element).text();
          } else if (t === 7) {
            data.percent = $(element).text();
          } else if (t === 8) {
            data.points = $(element).text();
          }
        });
      list.push(data);
    });
  list.splice(0, 1);
  list.splice(8, 1);

  // no error, but the response is good!
  return [null, list];
}

// A controller that just calls the service and returns the result.
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Using our new service! Shiny!
  const [err, ladder] = await aflLadderService();

  // Lets handle the error state
  if (err) return res.status(500).json(err);

  // And when all is good in the world, we do what was expected!
  return res.status(200).json(ladder);
}
