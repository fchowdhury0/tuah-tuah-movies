package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Shows;
import java.util.List;
import jakarta.transaction.Transactional;

@Repository
public interface ShowsRepository extends JpaRepository<Shows, Long> {

  List<Shows> findByMovieId(Long movieId);

  @Transactional
  void deleteByMovieId(Long movieId);
}
