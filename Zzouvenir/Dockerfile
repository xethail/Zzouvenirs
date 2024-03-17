FROM eclipse-temurin:17-jre-alpine
ENV JAVA_OPTS=""

EXPOSE 8082

COPY build/libs/Zzouvenir-0.0.1-SNAPSHOT.jar /app.jar 
COPY src/main/resources/application.properties /backend/application.properties


CMD java $JAVA_OPTS -jar /app.jar --spring.config.location=/backend/application.properties
