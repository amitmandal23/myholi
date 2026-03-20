import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { IMAGE_BASE_URL } from "../../config/api";

/**
 * Reusable gallery image grid with delete support.
 *
 * Props:
 *  - images: string[]          — array of image URL paths
 *  - onDelete: (img) => void   — called with the image path when delete is confirmed
 *  - deleting: string|null     — image path currently being deleted (shows spinner)
 */
const GalleryImageGrid = ({ images = [], onDelete, deleting = null }) => {
  if (!images.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {images.map((img, idx) => {
        const src =
          img && img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;
        const isDeleting = deleting === img;

        return (
          <div key={idx} className="relative w-16 h-16 group">
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover rounded border"
            />
            {/* Delete overlay */}
            <button
              type="button"
              onClick={() => onDelete && onDelete(img)}
              disabled={isDeleting}
              title="Remove image"
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded"
            >
              {isDeleting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 size={16} className="text-white" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryImageGrid;
