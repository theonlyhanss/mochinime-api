import { load } from "cheerio";
import { getData, requestFailed, ANIME_CDN_URL } from "../utils/index.js";
import { default as Axios } from "axios";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate"
}

export const episodeDetail = async (req, res) => {
    const slug = req.params.slug;
    const url = `${ANIME_CDN_URL}/${slug}/`;
    const domainUrl = ANIME_CDN_URL;

    try {
        const response = await Axios.get(url, {headers});
        const $ = load(response.data);
        const mainElement = $(".detail");

        let eps_detail = {};

        eps_detail.title = mainElement.find("strong").text();
        eps_detail.poster = domainUrl + mainElement.find("img").attr("src");

        const streamUrl = $(".server:nth-child(1)").attr("data-video") || $(".server:nth-child(2)").attr("data-video") || "-";
        eps_detail.stream_url = streamUrl.startsWith("//gdrive") ? streamUrl : streamUrl.startsWith("https://") ? streamUrl : domainUrl + streamUrl;
        eps_detail.synopsis = mainElement.find("p").text();
        eps_detail.anime_slug = $(".navi > a:contains('Semua')").attr("href")?.match(/\/anime\/([^/]+)\//)?.[1] || "-";
        eps_detail.next_eps_slug = $(".navi > a:contains('Next')").attr("href")?.match(/\/([^\/]+)\/$/)?.[1] || "-";
        eps_detail.prev_eps_slug = $(".navi > a:contains('Prev')").attr("href")?.match(/\/([^\/]+)/)?.[1] || "-";

        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({
            author: "@hanmetaforce",
            status: res.statusCode,
            eps_detail
        }, null, 2));
    } catch (e) {
        requestFailed(req, res, e);
    }
}