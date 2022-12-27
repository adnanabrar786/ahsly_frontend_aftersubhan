import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/BannerCard.module.scss";
const BannerCard = ({ banner, categoriesData }) => {
  // console.log(categoriesData);

  const [catIndex, setCatIndex] = useState(0);

  const selectedCategory = categoriesData
    .slice(catIndex, catIndex + 1)
    .map((item) => {
      return item;
    });
  const newselectedCategory = selectedCategory[0];
  const selectedSubCategories = newselectedCategory.children.map((item) => {
    return item;
  });

  console.log(selectedSubCategories[0].slug);
  let a = selectedSubCategories[0].slug;

  return (
    <div className={styles.banner_card}>
      {banner && (
        <div className={styles.img}>
          <Image
            src={`${process.env.NEXT_PUBLIC_uploadURL}/banners/${banner.image}`}
            alt={banner.title}
            layout="fill"
            objectFit="fill"
          />
        </div>
      )}
      {banner && (
        <div className={styles.info}>
          <h4>{banner.title}</h4>
          <p>{banner.description}</p>
          <Link href={`/products?categorySlug=${a}`}>
            {/* <Link href="/"> */}
            {/* <Link href={`/products?categorySlug=${item.slug}`} key={item._id}> */}
            <a>
              <button>Shop Now</button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BannerCard;
