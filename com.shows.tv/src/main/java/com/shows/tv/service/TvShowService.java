package com.shows.tv.service;

import com.shows.tv.controller.TvShowsController;
import com.shows.tv.model.TvShow;
import com.shows.tv.repository.TvShowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TvShowService {


    private static final Logger logger = LoggerFactory.getLogger(TvShowsController.class);

    @Autowired TvShowRepository tvShowRepository;
    public List<TvShow> getTvShows(){
        logger.info("getTvShows service");
        return tvShowRepository.findAll();
    }

    public TvShow getTvShow(String name){
        logger.info("getTvShow service");
        return tvShowRepository.findByName(name);
    }

    public TvShow setTvShow(TvShow show){
        logger.info("setTvShows service");
        return tvShowRepository.save(show);
    }

}
