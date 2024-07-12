## Steps
This are the steps to create and run the project

### Build the image
```
docker build -t webserver -f Dockerfile .
```

### Run the image

```
docker run -it --rm -d -p 8080:80 --name web webserver

docker-compose up web

```