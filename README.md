<p align="center">
  <a href="https://github.com/theonlyhanss">
    <img src="https://s6.imgcdn.dev/YCmnRv.jpg" alt="https://github.com/theonlyhanss" border="0">
  </a>
</p>

<h3 align="center">MOCHINIME API</h3>
<p align="center">
  <samp>Rest API gratis untuk mendapatkan data anime serta link streaming anime dari website <a href="https://anime-indo.lol">AnimeIndo</a></samp>
</p>

# Instalasi

- Jalankan perintah di terminal

```sh
# clone repo
git clone https://github.com/theonlyhanssY/mochinime-api.git

# masuk folder
cd mochinime-api

# install dependensi
npm install

# jalankan server
npm run dev
```

- Server akan berjalan di http://localhost:3000

# Routes
Endpoint : http://localhost:3000/api

| Endpoint              | Params          | Description                |
| --------------------- | --------------- | -------------------------- |
| /api/latest           | -               | Latest Release             |
| /api/popular          | -               | Popular Series             |
| /api/movie/page/:page | :page           | Anime Movie                |
| /api/search/:query    | :query          | Search Anime               |
| /api/anime/:slug      | :slug           | Anime details              |
| /api/episode/:slug    | :slug           | Detail Episode             |

# Support Me
[Saweria](https://saweria.co/hanmetaforce)
