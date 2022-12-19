//@ts-ignore
import styles from './UploadedImage.module.css';

interface Props {
  imgSrc: string;
  imgName: string;
  deleteImage: (name: string) => void;
}

export default function UploadedImage({ imgSrc, imgName, deleteImage }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.delete} onClick={() => deleteImage(imgName)}>
        Delete
      </span>
      <img className={styles.image} src={imgSrc} />
    </div>
  );
}
