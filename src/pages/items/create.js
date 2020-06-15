// Libs
import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import withAppTemplate from "../../templates/withApp";

// Components
import ItemForm from "../../components/items/itemForm";
import Firebase from "../../firebase/app";

const CreateItem = ({}) => {
  const router = useRouter();

  return (
    <div>
      <Link href="/inventory">
        <a>Back to Inventory</a>
      </Link>
      <h1>Create Item</h1>
      <ItemForm
        formType="create"
        handleSubmit={async (formValues) => {
          console.log(formValues);
          const res = await Firebase.actions.createItem({
            photos: formValues.photos,
            title: formValues.title,
            price: formValues.price,
            description: formValues.description,
          });
          router.push("/items/" + res.id);
        }}
      />
    </div>
  );
  a;
};

export default withAppTemplate(CreateItem);
