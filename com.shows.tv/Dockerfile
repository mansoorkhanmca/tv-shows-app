FROM openjdk:21-jdk-slim AS build

# Set working directory
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy the pom.xml file
COPY pom.xml ./

# Copy the entire project (this will include the source code)
COPY src ./src

# Install dependencies and build the application (using local Maven instead of mvnw)
RUN mvn clean install -DskipTests

# Copy the built JAR to the final image
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the application JAR from the build stage
COPY --from=build /app/target/com.shows.tv-0.0.1-SNAPSHOT.jar /app/my-app.jar

# Copy the resources (e.g., tvtitles.txt) from the build stage
COPY --from=build /app/src/main/resources /app/src/main/resources

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/my-app.jar"]


