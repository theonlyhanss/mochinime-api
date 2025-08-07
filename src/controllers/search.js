import { default as Axios } from "axios";
import { requestFailed, ANIME_CDN_URL } from "../utils/index.js";
import { load } from "cheerio";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate"
}

export const searchAnime = async (req, res) => {
    const params = req.params.query;
    const url = `${ANIME_CDN_URL}/search/${params}/`;

    try {
        const response = await Axios.get(url, {headers});
        const $ = load(response.data);

        let data = [];
        $("#content-wrap > div.menu > table").each((i, el) => {
            data.push({
                title: $(el).find(" tbody > tr > td.videsc > a").text(),
                poster: $(el).find("img").attr("data-original"),
                slug: $(el).find(" tbody > tr > td.vithumb > a").attr("href").match(/\/anime\/([^/]+)\//)?.[1],
                type: $(el).find(" tbody > tr > td.videsc > span:nth-child(3)").text(),
                synopsis: $(el).find(" tbody > tr > td.videsc > p").text(),
                release: $(el).find(" tbody > tr > td.videsc > span:nth-child(5)").text(),
                duration: $(el).find("tbody > tr > td.videsc > span:nth-child(4)").text(),
            });
        });

        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({
            author: "@hanmetaforce",
            status: res.statusCode,
            query: params,
            data
        }, null, 2));
    } catch (err) {
        requestFailed(req, res, err);
    }
}