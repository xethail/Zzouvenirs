## Zzouvenir API Backend Documentation

This document provides an overview and documentation for the Zzouvenir API backend, which is responsible for managing articles with images. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on articles stored in a PostgreSQL database. It also supports uploading and retrieving images associated with articles.

### Table of Contents
1. [Setup](#setup)
2. [Endpoints](#endpoints)
    - [Add Article](#add-article)
    - [Update Article](#update-article)
    - [Get All Articles](#get-all-articles)
    - [Get Article by ID](#get-article-by-id)
    - [Get Article Image](#get-article-image)
    - [Delete Article](#delete-article)
    - [Delete All Articles](#delete-all-articles)

### Setup <a name="setup"></a>

To run the Zzouvenir API backend, you'll need the following prerequisites:
- Java JDK 8 or higher
- Apache Maven
- PostgreSQL database

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Zzouvenir
   ```

3. Update `application.properties` with your PostgreSQL database configuration:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/zzouvenir
   spring.datasource.username=zzouvenir
   spring.datasource.password=zzouvenir
   ```

4. Build the project:
   ```bash
   mvn clean install
   ```

5. Run the application:
   ```bash
   java -jar target/zzouvenir-0.0.1-SNAPSHOT.jar
   ```

### Endpoints <a name="endpoints"></a>

#### Add Article <a name="add-article"></a>

- **Endpoint**: `POST /articles`
- **Description**: Adds a new article with an associated image.
- **Request Body**:
  - `image`: Image file (multipart/form-data)
  - `article`: JSON representation of the article object
- **Example**:
  ```bash
  curl -X POST -F "image=@path/to/image.jpg" -F "article={\"titre\":\"Example Title\",\"prix\":10.99,\"comment\":\"Example Comment\",\"ordre\":1}" http://localhost:8080/articles
  ```

#### Update Article <a name="update-article"></a>

- **Endpoint**: `PUT /articles/{id}`
- **Description**: Updates an existing article by ID.
- **Request Parameters**:
  - `id`: ID of the article to be updated
- **Request Body**:
  - `image`: Updated image file (optional, multipart/form-data)
  - `article`: JSON representation of the updated article object
- **Example**:
  ```bash
  curl -X PUT -F "image=@path/to/updated_image.jpg" -F "article={\"titre\":\"Updated Title\",\"prix\":15.99,\"comment\":\"Updated Comment\",\"ordre\":2}" http://localhost:8080/articles/1
  ```

#### Get All Articles <a name="get-all-articles"></a>

- **Endpoint**: `GET /articles`
- **Description**: Retrieves all articles stored in the database.
- **Example**:
  ```bash
  curl http://localhost:8080/articles
  ```

#### Get Article by ID <a name="get-article-by-id"></a>

- **Endpoint**: `GET /articles/{id}`
- **Description**: Retrieves an article by its ID.
- **Request Parameters**:
  - `id`: ID of the article to retrieve
- **Example**:
  ```bash
  curl http://localhost:8080/articles/1
  ```

#### Get Article Image <a name="get-article-image"></a>

- **Endpoint**: `GET /articles/{id}/image`
- **Description**: Retrieves the image associated with a specific article by its ID.
- **Request Parameters**:
  - `id`: ID of the article
- **Example**:
  ```bash
  curl http://localhost:8080/articles/1/image --output article_image.jpg
  ```

#### Delete Article <a name="delete-article"></a>

- **Endpoint**: `DELETE /articles/{id}`
- **Description**: Deletes an article by its ID.
- **Request Parameters**:
  - `id`: ID of the article to delete
- **Example**:
  ```bash
  curl -X DELETE http://localhost:8080/articles/1
  ```

#### Delete All Articles <a name="delete-all-articles"></a>

- **Endpoint**: `DELETE /articles`
- **Description**: Deletes all articles from the database.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:8080/articles
  ```

This concludes the documentation for the Zzouvenir API backend. You can now utilize the provided endpoints to interact with the API and manage articles effectively.