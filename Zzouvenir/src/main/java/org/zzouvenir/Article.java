package org.zzouvenir;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String titre;
    @Setter
    private double prix;
    @Setter
    private String comment;
    @Setter
    private int ordre;

    @Setter
    @Lob
    @Column(columnDefinition = "bytea") // Spécifier le type de colonne comme bytea pour PostgreSQL
    private byte[] image; // Champ pour stocker l'image en tant que BLOB

    public Article() {
    }

    public Article(String titre, double prix, String comment, int ordre, byte[] image) {
        this.titre = titre;
        this.prix = prix;
        this.comment = comment;
        this.ordre = ordre;
        this.image = image;
    }


    @Setter
    private String imageType; // Field to store the type of the image (e.g., "jpg", "png", etc.)

    // Constructors, Getters, Setters...

}
