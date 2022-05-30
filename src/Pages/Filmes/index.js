/* eslint-disable react/jsx-curly-brace-presence */
import { useCallback, useEffect, lazy, useState, Suspense } from 'react'
import SkeletonCarosuel from '../../Components/Carosuel/skeleton'
import apiMovies from '../../services/apiMovies'

const Carousel = lazy(() => import('../../Components/Carosuel'))

//{``https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}
export default function Filmes() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    apiMovies
      .get('movie/now_playing', {
        params: {
          api_key: '18837df4b81f4d167d64ac8bc77f7eae',
          language: 'pt-BR',
          page: 1,
        },
      })
      .then((res) => {
        setMovies(res.data.results)
      })
      .catch((err) => {
        console.log('ERR ', err)
      })
  }, [])

  const loadImgs = useCallback(() => {
    let cache = []
    let arrayImgs = movies.map((movie) => {
      cache.push(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)
      return {
        id: movie.id,
        imgs: (
          <div
            key={movie.id}
            className="flex w-52  relative rounded bg-slate-500 items-center justify-center group  "
          >
            <img
              className="rounded w-56  h-72 duration-500"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="flex items-center rounded justify-center w-full h-full absolute backdrop-blur-[2px] opacity-0 group-hover:opacity-100 duration-500">
              <button className="font-body font-semibold text-white  text-xl">
                Detalhar
              </button>
            </div>
          </div>
        ),
      }
    })
    return arrayImgs
  })

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full px-10 ">
        {movies.length === 0 ? (
          <SkeletonCarosuel />
        ) : (
          <Carousel imgs={loadImgs()} />
        )}
      </div>
    </div>
  )
}
