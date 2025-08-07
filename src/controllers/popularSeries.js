import { load } from "cheerio";
import { default as Axios } from "axios";
import { requestFailed, ANIME_CDN_URL } from "../utils/index.js";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate",
}

export const popularSeries = async (req, res) => {
    let data = [];

    try {
        const response = await Axios.get(ANIME_CDN_URL, {headers});
        const $ = load(response.data);

        $("#content-wrap > .nganan > .menu > table").each((i, el) => {
            data.push({
                title: $(el).find("tbody > tr > .zvidesc > a").text(),
                poster: ANIME_CDN_URL + $(el).find("tbody > tr > .zvithumb > a > img").attr("src"),
                slug: $(el).find("tbody > tr > .zvidesc > a").attr("href").match(/\/([^/]+)\/$/)[1],
                genres: $(el)
                    .find(" tbody > tr > td.zvidesc")
                    .text()
                    .match(/[A-Z][\w ]+(?=,|\s|$)/g)
                    .slice(1),
            });
        });

        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({
            author: "@hanmetaforce",
            status: res.statusCode,
            data
        }, null, 2));
    } catch (err) {
        requestFailed(req, res, err);
    }
}