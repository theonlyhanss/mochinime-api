import { default as Axios } from "axios";
import { load } from "cheerio";

export const ANIME_CDN_URL = 'https://anime-indo.lol';

export const requestFailed = (req, res, err) => {
    // If error is from Axios and has a response status, use it
    const status = err.response?.status || 502;
    let message = err.message;
    if (status === 503) {
        message = 'Source data is currently unavailable (503 Service Unavailable)';
    }
    res.status(status).send({
        status: false,
        message
    });
}

export const getData = async (url) => {
    try {
        const response = await Axios.get(url);
        const $ = load(response.data);

        const streamUrl = $("video > source").attr("src");

        return streamUrl;
    } catch (error) {
        return error.message;
    }
};