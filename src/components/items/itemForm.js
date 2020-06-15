// Libs
import React, { useState } from "react";
import Firebase from "../../firebase/app";
import { useUser } from "../../context/user";

const ItemForm = ({ handleSubmit, formType, initValues }) => {
  const user = useUser();
  const [formState, setFormState] = useState({ status: "idle" });

  const [formValues, setFormValues] = useState(
    () =>
      initValues || {
        photos: [],
        title: "",
        description: "",
        price: "",
      }
  );
  const [fileUploader, setFileUploader] = useState({ status: "idle" });

  const handleOnChange = (value) => (evt) =>
    setFormValues({ ...formValues, [value]: evt.currentTarget.value });

  const handleOnFileChange = async (evt) => {
    if (!user.uid) return;
    const file = evt.currentTarget.files[0];
    if (formValues.photos.length + 1 > 8) return;
    setFileUploader({ status: "uploading" });

    // Upload to storage here
    const uniqueId = `static-${Date.now()}`;
    const extension = file.type.split("/").pop();

    const res = await Firebase.storage
      .ref(`images/${user.uid}/${uniqueId}.${extension}`)
      .put(file);
    const url = await res.ref.getDownloadURL();
    const newPhotos = [...formValues.photos, url];
    setFormValues({
      ...formValues,
      photos: newPhotos,
    });
    setFileUploader({ status: "idle" });
  };

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        setFormState({ status: "submitting" });
        await handleSubmit(formValues);
        setFormState({ status: "idle" });
      }}
    >
      <div>
        <div>
          <label>Photos ({formValues.photos.length})</label>
        </div>
        {formValues.photos.map((url) => (
          <div
            key={url}
            style={{
              display: "inline-block",
              width: 100,
              height: 100,
              background: `url(${url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              border: "1px solid gray",
            }}
          />
        ))}
      </div>
      {fileUploader.status === "idle" && (
        <div style={{ marginBottom: 10 }}>
          <input type="file" onChange={handleOnFileChange} />
        </div>
      )}
      {fileUploader.status === "uploading" && <div>Uploading Photo...</div>}
      <div>
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={handleOnChange("title")}
          value={formValues.title}
        />
      </div>
      <div>
        <textarea
          id="description"
          placeholder="Description"
          onChange={handleOnChange("description")}
          value={formValues.description}
        />
      </div>
      <div>
        <input
          type="text"
          id="price"
          placeholder="Price $$$"
          onChange={handleOnChange("price")}
          value={formValues.price}
        />
      </div>
      {formState.status === "idle" && (
        <button>{formType === "edit" ? "Save" : "Create"}</button>
      )}
      {formState.status === "submitting" && <div>Submitting...</div>}
    </form>
  );
};

export default ItemForm;
