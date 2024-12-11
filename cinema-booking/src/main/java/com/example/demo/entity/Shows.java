package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shows", schema = "public")
public class Shows {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_id")
    private Long showId;

    @Column(name = "show_date", nullable = false) 
    private LocalDateTime showDate;

    @Column(name = "show_time", nullable = false)
    private LocalDateTime showTime;

    @Column(name = "show_duration", nullable = false)
    private Integer showDuration;

    @Column(name = "show_room", nullable = false)
    private Integer showRoom;

    @Column(name = "movie_id", nullable = false)
    private Long movieId;

    @Column(name = "seats_remaining", nullable = false)
    private Integer seatsRemaining;

    // Constructors
    public Shows() {
    }

    public Shows(LocalDateTime showTime, Integer showDuration, Integer showRoom, Long movieId, Integer seatsRemaining) {
        this.showTime = showTime;
        this.showDuration = showDuration;
        this.showRoom = showRoom;
        this.movieId = movieId;
        this.seatsRemaining = seatsRemaining;
    }

    // Getters and Setters
    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public LocalDateTime getShowDate() {
      return showDate;
  }
  public void setShowDate(LocalDateTime showDate) {
    this.showDate = showDate;
}
    public LocalDateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
    }

    public Integer getShowDuration() {
        return showDuration;
    }

    public void setShowDuration(Integer showDuration) {
        this.showDuration = showDuration;
    }

    public Integer getShowRoom() {
        return showRoom;
    }

    public void setShowRoom(Integer showRoom) {
        this.showRoom = showRoom;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Integer getSeatsRemaining() {
        return seatsRemaining;
    }

    public void setSeatsRemaining(Integer seatsRemaining) {
        this.seatsRemaining = seatsRemaining;
    }
}
