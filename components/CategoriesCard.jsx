import React from "react";
import Image from "next/image";
import Link from "next/link";
import categories from "../styles/CategoriesCard.module.scss";
const CategoriesCard = ({ img, title, slug }) => {

  return (
    <div className={categories.category_wrapper}>
      <div className={categories.img}>
        <Link href={`/products/${slug}`}>
          <a>
            <Image
              // loader={() => src}
              src={`${process.env.NEXT_PUBLIC_uploadURL}/categories/${img}`}
              alt={title}
              layout="fill"
              objectFit="fill"
              style={{ borderRadius: "50%" }}
            />
          </a>
        </Link>
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default CategoriesCard;
