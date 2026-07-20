"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  multiple?: boolean;
}

export function ImageUpload({ value, onChange, onRemove, multiple = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    
    try {
      const uploadPromises = files.map(async (file) => {
        const uniqueName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `uploads/${uniqueName}`);
        
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        return downloadURL;
      });

      const urls = await Promise.all(uploadPromises);
      
      if (multiple) {
        onChange([...value, ...urls]);
      } else {
        onChange([urls[0]]);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      // Reset input value to allow uploading same file again if removed
      e.target.value = '';
    }
  }, [onChange, multiple, value]);

  const handleRemove = async (url: string) => {
    // Optionally delete from Firebase Storage if we want to save space
    try {
       // We can extract the file path from the URL, but for now we just remove from state
       onRemove(url);
    } catch (error) {
      console.error("Failed to remove", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-40 h-40 rounded-md overflow-hidden border border-border group">
            <img src={url} alt="Upload" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                type="button" 
                variant="destructive" 
                size="icon" 
                onClick={() => handleRemove(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(!value.length || multiple) && (
          <label className="relative w-40 h-40 rounded-md border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-muted/20">
            {isUploading ? (
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            ) : (
              <>
                <ImagePlus className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Upload Image</span>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple={multiple} 
              onChange={onUpload}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
