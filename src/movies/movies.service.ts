import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    return this.movies.find((movie) => movie.id === movieId);
  }

  deleteOne(movieId: number): boolean {
    this.getOne(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== +movieId);
    return true;
  }

  create(movieData: CreateMovieDto): boolean {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
    return true;
  }

  updateOne(movieId: number, movieData: UpdateMovieDto): boolean {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.create({ ...movie, ...movieData });
    return true;
  }
}
