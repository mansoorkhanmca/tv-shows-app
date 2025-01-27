package com.shows.tv.repository;


import com.shows.tv.model.TvShow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TvShowRepository extends JpaRepository<TvShow, String> {

    public TvShow findByName(String name);

}

