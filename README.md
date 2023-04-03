# WebBlob Experiment

The [WebBlob](./WebBlob.js) class is an extension of the Blob class that allows
you to create a Blob from an URL.

The remote source will be lazy loaded, either by slices or by a stream.

The goal is to be able to use `WebBlob` as a replacement of `Blob` in API such as `fetch`.

Unfortunately, it seems like Firefox and Chrome does not support this extended Blob,
despite the fact that it implements exactly the same API.

## Run the experiment

1. Clone this repository
2. Install dependencies `npm install`
3. Open http://localhost:3000 in your browser
4. Click "Upload with Blob" or "Upload with WebBlob"

When uploading with a WebBlob as the `body` of `fetch`, the request received by the server does not contains any data in the body.

![image](https://user-images.githubusercontent.com/4447392/229648146-67a13bad-84c2-4096-a463-77d174ba867f.png)
