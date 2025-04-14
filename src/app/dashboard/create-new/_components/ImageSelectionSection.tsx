"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelectionSection({ selectedImage }: any) {
  const [file, setFile] = useState<any>();

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileRaw = event.target.files ? event.target.files[0] : null;
    if (fileRaw) {
      console.log("fileraw:", fileRaw)
      setFile(fileRaw);
      selectedImage(fileRaw);
    } else {
      return alert("No se ha seleccionado ningún archivo");
    }
  };

  return (
    <div>
      <label>Selecciona la imagen de su habitación</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`${
              file && "p-0.5"
            } p-28 border rounded-xl border-dotted flex justify-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg`}
          >
            {!file ? (
              <Image
                src={"/imageupload.webp"}
                width={70}
                height={70}
                alt="upload-image"
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                width={300}
                height={300}
                alt="upload-image"
                className="w-[300px] h-[300px] object-cover"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelectionSection;
