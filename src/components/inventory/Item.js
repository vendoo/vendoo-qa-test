// Libs
import React from "react";
import Link from "next/link";

const Item = ({ details, id }) => {
  const { title } = details;
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0 }}>Title: {title}</h2>
      <Link href={"/items/" + id}>
        <a>View Item</a>
      </Link>
    </div>
  );
};

export default Item;
