package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ShowSeatingChart;
import com.example.demo.entity.Shows;
import com.example.demo.service.ShowSeatingChartService;
import com.example.demo.repository.ShowsRepository;
import com.example.demo.service.TicketService;

@RestController
@RequestMapping("/api/shows")
public class ShowsController {

  @Autowired
  private ShowSeatingChartService showSeatingChartService;

  @Autowired
  private ShowsRepository showsRepository;

  @Autowired
  private TicketService ticketService;

  @GetMapping
  public List<Shows> getAllShows() {
    return showsRepository.findAll();
  }

  @GetMapping("/{id}")
  public Shows getShowById(@PathVariable Long id) {
    Optional<Shows> show = showsRepository.findById(id);
    return show.orElse(null);
  }
    @PutMapping("/{id}")
    public Shows updateShow(@PathVariable Long id, @RequestBody Shows updatedShow) {
        return showsRepository.findById(id)
                .map(show -> {
                    show.setShowTime(updatedShow.getShowTime());
                    show.setShowDuration(updatedShow.getShowDuration());
                    show.setShowRoom(updatedShow.getShowRoom());
                    show.setMovieId(updatedShow.getMovieId());
                    show.setSeatsRemaining(updatedShow.getSeatsRemaining());
                    return showsRepository.save(show);
                })
                .orElseGet(() -> {
                    updatedShow.setShowId(id);
                    return showsRepository.save(updatedShow);
                });
    }

  @PostMapping
  public Shows createShow(@RequestBody Shows newShow) {
    return showsRepository.save(newShow);
  }


  @DeleteMapping("/{id}")
  public void deleteShow(@PathVariable Long id) {
    showsRepository.deleteById(id);
  }

  @DeleteMapping("/movie/{movieId}")
  public void deleteShowsByMovieId(@PathVariable Long movieId) {
    showsRepository.deleteByMovieId(movieId);
  }

  @DeleteMapping("/seatingCharts/movie/{movieId}")
  public void deleteShowSeatingChartsByMovieId(@PathVariable Long movieId) {
    List<Shows> shows = showsRepository.findByMovieId(movieId);
    for (Shows show : shows) {
      List<ShowSeatingChart> seatingCharts = showSeatingChartService.findByShowId(show.getShowId());
      for (ShowSeatingChart seatingChart : seatingCharts) {
        ticketService.deleteByShowSeatingId(seatingChart.getShowSeatingId());
      }
        showSeatingChartService.deleteByShowId(show.getShowId());
    }
  }
}
