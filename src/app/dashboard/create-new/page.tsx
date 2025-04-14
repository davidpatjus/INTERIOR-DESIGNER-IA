"use client";
import React, { useState } from "react";
import ImageSelectionSection from "./_components/ImageSelectionSection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/SupabaseConfig";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";

function CreateNew() {

  const { user } = useUser();

  const [formData, setFormData] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const [aiOutput, setAiOutput] = useState<any>();

  const [orgImageUrl, setOrgImageUrl] = useState<any>();

  const [openOutputDialog, setOpenOutputDialog] = useState(false);

  const onHandleInputChange = (value: any, fieldName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const uploadImageToSupabase = async (file: File) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from("InteriorDesignerBucket") 
        .upload(fileName, file);

      if (error) {
        console.error("Error subiendo la imagen:", error.message);
        throw new Error("No se pudo subir la imagen a Supabase.");
      }

      // Obtén la URL pública de la imagen
      const { data: publicUrlData } = supabase.storage
      .from("InteriorDesignerBucket")
      .getPublicUrl(fileName);

      if (!publicUrlData) {
        throw new Error("No se pudo obtener la URL pública de la imagen.");
      }

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const GenerateAiImage = async () => {
    setLoading(true);
    try {
      // Subir imagen a Supabase
      if (formData.image) {
        const imageUrl = await uploadImageToSupabase(formData.image);
      
        if (!imageUrl) {
          alert("No se pudo procesar la imagen. Inténtalo nuevamente.");
          return;
        }

        setOrgImageUrl(imageUrl);

        // Añadir la URL de la imagen al objeto formData
        const updatedFormData = {
          ...formData,
          imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        };

        // Enviar formData al backend
        const result = await axios.post("/api/redesign-room", updatedFormData);
        console.log("Resultado del backend:", result.data);
        setAiOutput(result.data.result); // output image url
        setLoading(false);
        setOpenOutputDialog(true);
      } else {
        alert("Selecciona una imagen antes de continuar.");
        setLoading(false);
      }
      
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Primary Section */}
      <h2 className="font-bold text-4xl text-primary text-center">
        Experimenta la magia de la remodelación con IA
      </h2>
      <p className="text-center text-gray-500">
        Transforme cualquier habitación con un clic. Selecciona un espacio,
        elige un estilo y observa cómo la IA reimagina tu entorno al instante.
      </p>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <ImageSelectionSection
          selectedImage={(value: any) => onHandleInputChange(value, "image")}
        />

        {/* Form Input Section */}
        <div>
          {/* Room Type */}
          <RoomType
            selectedRoomType={(value: any) => onHandleInputChange(value, "roomType")}
          />

          {/* Design Type */}
          <DesignType
            selectedDesignType={(value: any) =>
              onHandleInputChange(value, "designType")
            }
          />

          {/* Additional Requeriment TextArea (Optional) */}
          <AdditionalReq
            selectedAdditionalReq={(value: any) =>
              onHandleInputChange(value, "additionalReq")
            }
          />

          {/* Button to Generate Image */}
          <Button className="w-full mt-5" onClick={GenerateAiImage}>
            Generar
          </Button>

          {/* Note */}
          <p className="text-sm text-gray-400 mb-20 mt-1">
            NOTA: Se usara 1 credito por cada generación
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog 
        aiImageUrl={aiOutput}
        orgImageUrl={orgImageUrl}
        openDialog={openOutputDialog} 
        closeDialog={() => setOpenOutputDialog(false)} 
      />
    </div>
  );
}

export default CreateNew;
