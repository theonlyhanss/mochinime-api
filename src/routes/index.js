import { Router } from "express";
import { animeDetail } from "../controllers/animeDetail.js";
import { latestRelease } from "../controllers/latestRelease.js";
import { episodeDetail } from "../controllers/episodeDetail.js";
import { popularSeries } from "../controllers/popularSeries.js";
import { searchAnime } from "../controllers/search.js";
import { animeMovie } from "../controllers/animeMovie.js";

const router = Router();

/**
 * @swagger
 * /api/latest/:
 *   get:
 *     summary: Get latest anime releases
 *     responses:
 *       200:
 *         description: List of latest anime
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/latest/', latestRelease);

/**
 * @swagger
 * /api/latest/page/{page}:
 *   get:
 *     summary: Get latest anime releases by page
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of latest anime by page
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/latest/page/:page', latestRelease);

/**
 * @swagger
 * /api/popular:
 *   get:
 *     summary: Get popular anime series
 *     responses:
 *       200:
 *         description: List of popular anime
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/popular', popularSeries);

/**
 * @swagger
 * /api/movie:
 *   get:
 *     summary: Get anime movies (page 1)
 *     responses:
 *       200:
 *         description: List of anime movies
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/movie', animeMovie);

/**
 * @swagger
 * /api/movie/page/{page}:
 *   get:
 *     summary: Get anime movies by page
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of anime movies by page
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/movie/page/:page', animeMovie);

/**
 * @swagger
 * /api/anime/{slug}:
 *   get:
 *     summary: Get anime detail by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Anime slug
 *     responses:
 *       200:
 *         description: Anime detail
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/anime/:slug', animeDetail);

/**
 * @swagger
 * /api/episode/{slug}:
 *   get:
 *     summary: Get episode detail by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Episode slug
 *     responses:
 *       200:
 *         description: Episode detail
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/episode/:slug', episodeDetail);

/**
 * @swagger
 * /api/search/{query}:
 *   get:
 *     summary: Search anime by query
 *     parameters:
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search result
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/search/:query', searchAnime);

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get API status (total requests, uptime, etc)
 *     responses:
 *       200:
 *         description: API status
 *       500:
 *         description: Internal server error
 */

export default router;
