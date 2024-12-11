package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movie_id;

    @NotNull
    @Size(min = 1, max = 255)
    private String title;

    private String category;

    @Column(name="cast_members")
    private String castMembers;

    private String director;

    private String producer;

    @Size(max = 5000)
    private String synopsis;

    @Size(max = 5000)
    private String reviews;

    @Column(name = "trailerurl")
    private String trailerUrl;

    @Column(name = "ratingcode")
    private String ratingCode;

    @Column(name = "releasedate")
    private LocalDate releaseDate;

    @NotNull
    private String status;

    @NotNull
    private String imdbId;

    @Column(name = "posterurl")
    private String posterUrl;

    // No-Args Constructor
    public Movie() {}

    // All-Args Constructor
    public Movie(String title, String category, String castMembers, String director, String producer,
                 String synopsis, String reviews, String trailerUrl, String ratingCode,
                 LocalDate showDate, LocalDate releaseDate, String status,
                 String imdbId, String posterUrl) {
        this.title = title;
        this.category = category;
        this.castMembers = castMembers;
        this.director = director;
        this.producer = producer;
        this.synopsis = synopsis;
        this.reviews = reviews;
        this.trailerUrl = trailerUrl;
        this.ratingCode = ratingCode;
        this.releaseDate = releaseDate;
        this.status = status;
        this.imdbId = imdbId;
        this.posterUrl = posterUrl;
    }

    // Getters and Setters
    public Long getId() {
        return movie_id;
    }

    public void setId(Long id) {
        this.movie_id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCastMembers() {
        return castMembers;
    }

    public void setCastMembers(String castMembers) {
        this.castMembers = castMembers;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getRatingCode() {
        return ratingCode;
    }

    public void setRatingCode(String ratingCode) {
        this.ratingCode = ratingCode;
    }

    
    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }
}
