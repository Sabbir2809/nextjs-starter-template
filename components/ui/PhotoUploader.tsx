import Friday from "@/utils/Friday";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuCircleX, LuUpload, LuX } from "react-icons/lu";
import { toast } from "react-toastify";

// PhotoUploader
type Props = {
  onUploaded: (url: string) => void;
};
function PhotoUploader({ onUploaded }: Props) {
  const [image, setImage] = useState<File>();
  const [upload, setUpload] = useState(false);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

  const handleReset = () => {
    setImage(undefined);
  };

  const handleUploadToCloud = async () => {
    setUpload(true);
    try {
      if (!image) throw new Error("Please select an image file");
      const formData = new FormData();
      formData.append("frontImage", image);
      formData.append("documentType", "static_image");

      const apiUrl = `${process.env.NEXT_PUBLIC_CDN_MEDIA_UPLOAD_URL}/admin/document/upload`;
      const response = await Friday.upload(new URL(apiUrl), formData);

      if (response) {
        toast.success(response?.message);
        if (onUploaded) await onUploaded(response?.url);
        handleReset();
      }
    } catch (e) {
      toast.error((e as Error).message);
    }
    setUpload(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="relative">
        {image && (
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(image)}
            alt="uploader"
          />
        )}
        <label>
          {!image && (
            <div className="flex flex-col items-center justify-center cursor-pointer p-4">
              <LuUpload />
              <p className="mt-2 text-sm text-gray-600">Select an image</p>
            </div>
          )}
          <input id="inputId" onChange={onSelectFile} type="file" className="hidden" />
        </label>

        {image && (
          <div className="absolute top-0 flex justify-between w-full p-2">
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white p-2 rounded-full">
              <LuCircleX />
            </button>
            <button
              onClick={handleUploadToCloud}
              disabled={upload}
              className={`bg-blue-600 text-white p-2 rounded-lg flex items-center ${
                upload ? "opacity-50" : ""
              }`}>
              {upload ? (
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
              ) : (
                <LuUpload />
              )}
              <span className="ml-2">{upload ? "Uploading..." : "Upload"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// PhotoUploadModal
type TModalProps = {
  onCloseModal?: () => void | undefined;
  open: boolean;
  onUploadComplete?: (value: string) => void;
};
export const PhotoUploadModal = ({
  onCloseModal,
  open,
  onUploadComplete,
}: TModalProps) => {
  const handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent closing on backdrop or escape key
    if (event.type === "keydown" && (event as React.KeyboardEvent).key === "Escape")
      return;
    if (onCloseModal) onCloseModal();
  };

  const onUploadDone = (url: string) => {
    if (onUploadComplete) onUploadComplete(url);
    if (onCloseModal) onCloseModal();
  };

  useEffect(() => {
    if (open) {
      // Lock scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}>
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Upload Image</h2>
          {onCloseModal && (
            <button
              aria-label="close"
              onClick={onCloseModal}
              className="text-gray-600 hover:text-gray-800">
              <LuX />
            </button>
          )}
        </div>
        <div className="p-4">
          <PhotoUploader onUploaded={onUploadDone} />
        </div>
      </div>
    </div>
  );
};
