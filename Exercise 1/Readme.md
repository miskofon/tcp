# Exercise 1 - Image recognition
## Solution
I have used a Vision API from GCP. It expose and endpoint which will investigate an image (passed as URI) and return requested properties.

In this folder you can find attached file request.http (request definition for VS code REST API extension) which defines the request send to Vision API.

## Responce
Base on responce part:
```
"safeSearchAnnotation": {
    "adult": "VERY_UNLIKELY",
    "spoof": "VERY_UNLIKELY",
    "medical": "VERY_UNLIKELY",
    "violence": "VERY_UNLIKELY",
    "racy": "UNLIKELY"
}
```
> I can tell that is it very inlikely that this image contains prohibited content.

Other properites describing the image found by Vision API:
* Conversation
* Black-and-white
* Sitting
* Photography
* There is a Table in the image
