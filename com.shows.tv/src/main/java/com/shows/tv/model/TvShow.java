package com.shows.tv.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class TvShow {

//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long tvShowIdId;

    @Id
    private String name;
    private String type;

    private String language;
    private String status;
    private String runtime;
    private String premiered;
    private String rating;
    private String imageURL;
    private String imageThumbnail;
    private String summary;
    private String genres;


    public TvShow(String name, String type, String language, String status, String runtime, String premiered, String rating, String imageURL, String imageThumbnail, String summary, String genres) {
        this.name = name;
        this.type = type;
        this.language = language;
        this.status = status;
        this.runtime = runtime;
        this.premiered = premiered;
        this.rating = rating;
        this.imageURL = imageURL;
        this.imageThumbnail = imageThumbnail;
        this.summary = summary;
        this.genres = genres;
    }

    public TvShow() {
    }


    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getLanguage() {
        return language;
    }

    public String getStatus() {
        return status;
    }

    public String getRuntime() {
        return runtime;
    }

    public String getPremiered() {
        return premiered;
    }

    public String getRating() {
        return rating;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getImageThumbnail() {
        return imageThumbnail;
    }

    public String getSummary() {
        return summary;
    }

    public String getGenres() {
        return genres;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public void setPremiered(String premiered) {
        this.premiered = premiered;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public void setImageThumbnail(String imageThumbnail) {
        this.imageThumbnail = imageThumbnail;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }
}