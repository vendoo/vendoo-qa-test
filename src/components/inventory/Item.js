// Libs
import React from "react";
import Link from "next/link";

const Item = ({ details }) => {
  const { title, id} = details;
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ margin: 0 }}>Title: {title}</h4>
      <Link href={"/items/" + id}>
        <a>View Item</a>
      </Link>
    </div>
  );
};

export default Item;
