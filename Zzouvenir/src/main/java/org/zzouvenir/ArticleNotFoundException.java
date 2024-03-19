package org.zzouvenir;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(Long id) {
        super("Article not found with id: " + id);
    }
}
