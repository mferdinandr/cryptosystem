import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Download, Upload } from "lucide-react";
import { TabsContent } from "./ui/tabs";

// Props diperbarui
type FileCipherTabProps = {
  keyVal: string;
  setKey: (value: string) => void;
  selectedFile: File | null;
  isProcessing: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileEncrypt: () => void;
  handleFileDecrypt: () => void;
};

export function FileCipherTab({
  keyVal,
  setKey,
  selectedFile,
  isProcessing,
  handleFileChange,
  handleFileEncrypt,
  handleFileDecrypt,
}: FileCipherTabProps) {
  return (
    <TabsContent value="file" className="mt-4">
      <div className="grid gap-4">
        {/* ++ Input Kunci ditambahkan di sini ++ */}
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="file-key-input">Key</Label>
          <Input
            id="file-key-input"
            placeholder="Masukkan kunci untuk enkripsi file..."
            value={keyVal}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="grid gap-2 text-center">
          <Label htmlFor="file-upload">Select File</Label>
          <Input
            id="file-upload"
            type="file"
            className="mx-auto"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={handleFileEncrypt} disabled={isProcessing}>
            <Upload className="mr-2 h-4 w-4" />
            {isProcessing ? "Encrypting..." : "Encrypt File"}
          </Button>
          <Button
            onClick={handleFileDecrypt}
            variant="outline"
            disabled={isProcessing}
          >
            <Download className="mr-2 h-4 w-4" />
            {isProcessing ? "Decrypting..." : "Decrypt File"}
          </Button>
        </div>
      </div>
    </TabsContent>
  );
}
