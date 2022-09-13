import to from 'await-to-js';
import axios from 'axios';
import * as Cheerio from 'cheerio';
import { get, put } from 'memory-cache';

const ladderUrl = 'http://www.fanfooty.com.au/game/ladder.php';

export interface Rung {
  order: number;
  name?: string;
  played?: string;
  wins?: string;
  draw?: string;
  loss?: string;
  for?: string;
  agt?: string;
  percent?: string;
  points?: string;
}

export type Ladder = Rung[];

export const fetchLadder = async () => {
  const cachedLadder = get(ladderUrl);
  if (cachedLadder) return cachedLadder;

  const [err, res] = await to(axios.get<string>(ladderUrl));

  if (err) throw err;

  const htmlString = await res.data;
  const $ = Cheerio.load(htmlString);

  const ladder: Ladder = [];
  let j = 1;
  $('table')
    .find('tr')
    .each((_i: any, elem: any) => {
      const data: Rung = { order: 0 };
      $(elem)
        .find('td')
        .each((t: any, element: any) => {
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
      if (data.name && data.percent) {
        data.order = j;
        j++;
        ladder.push(data);
      }
    });

  put(ladderUrl, ladder, 6 * 1000 * 60 * 60);
  return ladder;
};
