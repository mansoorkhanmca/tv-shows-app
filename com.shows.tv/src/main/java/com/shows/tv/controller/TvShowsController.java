package com.shows.tv.controller;

import com.shows.tv.model.TvShow;
import com.shows.tv.service.TvShowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class TvShowsController {

    @Autowired TvShowService tvShowService;
    private static final Logger logger = LoggerFactory.getLogger(TvShowsController.class);

    /*
    * Get Tv Show By its Name
    * */
    @GetMapping("/getTvShow/{name}")
    public ResponseEntity<Object> getTvShow(
            @PathVariable("name") String name
    ){


        logger.info("getTvShow Controller");

        if (name == null || name.trim().isEmpty()) {
            return new ResponseEntity<>("Name cannot be empty", HttpStatus.BAD_REQUEST);
        }

        try{

            TvShow tvShow = tvShowService.getTvShow(name);
            return new ResponseEntity<>(tvShow, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    /*
     * Get All Tv Shows
     * */
    @GetMapping("/getTvShows")
    public ResponseEntity<Object> getTvShows(){
        logger.info("getTvShows Controller");
        try{

            List<TvShow> tvShows = tvShowService.getTvShows();
            return new ResponseEntity<>(tvShows, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


}
