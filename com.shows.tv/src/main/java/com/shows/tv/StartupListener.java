package com.shows.tv;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.jayway.jsonpath.JsonPath;
import com.shows.tv.model.TvShow;
import com.shows.tv.repository.TvShowRepository;
import com.shows.tv.service.TvShowService;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileNotFoundException;

import java.util.Arrays;
import java.util.Scanner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component

public class StartupListener implements
        ApplicationListener<ContextRefreshedEvent> {

    private static final Logger logger = LoggerFactory.getLogger(StartupListener.class);

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private TvShowService tvShowService;

    @Autowired
    private TvShowRepository tvShowRepository;

    @Value("${tvmaze.url}") private String TV_MAZE_URL;

    @Value("${tvmaze.filePath}") private String FILE_PATH;

    @Override public void onApplicationEvent(ContextRefreshedEvent event) {

        try (Connection connection = dataSource.getConnection()) {
            if (connection != null && !connection.isClosed()) {
                logger.info("Database connection successful!");
            }
        } catch (SQLException e) {
            logger.info("Failed to connect to the database: " + e.getMessage());
        }

        logger.info("Start getting TvShows from txt file");


        File file = new File(FILE_PATH);
        Scanner sc = null;
        try {
            sc = new Scanner(file);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        String fileContent = "";
        while (sc.hasNextLine()) {
            fileContent += sc.nextLine();
        }
        String[] allTvShows = fileContent.split(" ");
        logger.info(Arrays.toString(allTvShows));

        sc.close();
        //logger.info(String.valueOf(tvShowRepository.count()));

        loadTvShowsFromTvMaze(allTvShows);
    }


    public void loadTvShowsFromTvMaze(String[] allTvShows){

        for(String tvShow: allTvShows){

            try{


                ResponseEntity<Object> tvShowDetails = restTemplate.getForEntity(TV_MAZE_URL+tvShow,Object.class);

                ObjectMapper objectMapper = new ObjectMapper();

                String jsonResponse = objectMapper.writeValueAsString(tvShowDetails.getBody());

                logger.info(tvShowDetails.getBody().toString());
                TvShow tvShowObj = new TvShow();

                tvShowObj.setName(JsonPath.read(jsonResponse, "$.name").toString());
                tvShowObj.setGenres((JsonPath.read(jsonResponse, "$.genres")).toString());
                tvShowObj.setImageThumbnail(JsonPath.read(jsonResponse, "$.image.medium").toString());
                tvShowObj.setImageURL(JsonPath.read(jsonResponse, "$.image.original").toString());
                tvShowObj.setLanguage(JsonPath.read(jsonResponse, "$.language").toString());
                tvShowObj.setRating(JsonPath.read(jsonResponse, "$.rating.average").toString());
                tvShowObj.setRuntime(JsonPath.read(jsonResponse, "$.runtime").toString());
                tvShowObj.setStatus(JsonPath.read(jsonResponse, "$.status").toString());
                tvShowObj.setSummary(JsonPath.read(jsonResponse, "$.summary").toString());
                tvShowObj.setType(JsonPath.read(jsonResponse, "$.type").toString());

                tvShowService.setTvShow(tvShowObj);


            } catch (RuntimeException e) {
                //throw new RuntimeException(e);
                logger.info(e.getMessage());
            }catch (Exception e) {
                logger.info(e.getMessage());
            }


        }

    }
}