import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOneMovie(@Param('id') id: number): Movie {
    const movie = this.moviesService.getOne(id);

    if (!movie) {
      throw new NotFoundException(`Movie with Id: ${id}`);
    }

    return movie;
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  updateMovie(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
    return this.moviesService.updateOne(movieId, movieData);
  }
}
