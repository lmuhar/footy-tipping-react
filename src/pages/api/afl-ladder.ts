import { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from 'cheerio';


interface AflLadder {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const response = await fetch('http://www.fanfooty.com.au/game/ladder.php');
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    let list: AflLadder[] = [];
    
    $('table')
    .find('tr')
    .each((i: any, elem: any) => {
            let data: AflLadder = {order: 0};
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
    res.status(200).json(list);
}