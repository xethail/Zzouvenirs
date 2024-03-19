package org.zzouvenir;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping
    public ResponseEntity<Article> addArticle(@RequestParam("image") MultipartFile imageFile,
                                              @RequestParam("article") String articleJson) throws IOException {
        String imageType = imageFile.getContentType();
        byte[] imageData = imageFile.getBytes(); // Get image data as byte array
        logger.info("Image Type: {}", imageType); // Log image type
        logger.info("Image Data Length: {}", imageData.length); // Log image data length

        Article article = new ObjectMapper().readValue(articleJson, Article.class);
        article.setImage(imageFile.getBytes());
        article.setImageType(imageType);
        logger.info("Article JSON: {}", articleJson); // Log article JSON

        logger.info("Image Type: {}", article.getImage()); // Log image type

        logger.info("Image Type is : {}", article.getImage().getClass());



        Article savedArticle = articleRepository.save(article);
        logger.info("Saved Article ID: {}", savedArticle.getId()); // Log saved article ID

        return new ResponseEntity<>(savedArticle, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id,
                                                 @RequestParam("image") MultipartFile imageFile,
                                                 @RequestParam("article") String articleJson) throws IOException {
        Article articleDetails = new ObjectMapper().readValue(articleJson, Article.class);
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
        article.setTitre(articleDetails.getTitre());
        article.setPrix(articleDetails.getPrix());
        article.setComment(articleDetails.getComment());
        article.setOrdre(articleDetails.getOrdre());
        if (imageFile != null && !imageFile.isEmpty()) {
            article.setImage(imageFile.getBytes());
        }
        Article updatedArticle = articleRepository.save(article);
        return new ResponseEntity<>(updatedArticle, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleRepository.findAll();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<ByteArrayResource> getArticleImage(@PathVariable Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
        ByteArrayResource resource = new ByteArrayResource(article.getImage());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllArticles() {
        articleRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }

}
