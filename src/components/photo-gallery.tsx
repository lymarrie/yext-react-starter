type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  alternateText?: string;
  height?: number;
  thumbnails?: Array<Thumbnail>;
  url: string;
  width?: number;
};

type ImageObj = {
  image: Image;
};

type PhotoGallery = {
  photoGallery: Array<ImageObj>;
};

const PhotoGallery = (props: PhotoGallery, display: boolean) => {
  const { photoGallery } = props;
  const images = photoGallery.map((element) => (
      <div>
        <img src={element.image.url} className="rounded-xl drop-shadow-md"></img>
      </div>
    ));

  return (
    <>
      <div className="section text-center grid gap-y-5">
        <h2 className="text-4xl"><a id="gallery">Photo Gallery</a></h2>
        <div className="grid gap-y-8 md:grid-cols-3 gap-x-5 p-8">{images}</div>
      </div>    </>
  );
};

export default PhotoGallery;
