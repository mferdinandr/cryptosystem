import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { CipherType, CIPHER_NAMES } from "../lib/types";
import * as ciphers from "../lib/ciphers";
import { encryptFile, decryptFile } from "../lib/fileProcessor";
import { Download, Upload } from "lucide-react";

const KEY_PLACEHOLDERS = {
  [CipherType.Shift]: "e.g., 3",
  [CipherType.Substitution]: "e.g., ZYXWVUTSRQPONMLKJIHGFEDCBA",
  [CipherType.Affine]: "e.g., 5,8",
  [CipherType.Vigenere]: "e.g., SECRET",
  [CipherType.Hill]: "e.g., 9,4,5,7",
  [CipherType.Permutation]: "e.g., 3,1,4,2",
};

export function CipherInterface() {
  const [selectedCipher, setSelectedCipher] = useState<CipherType>(
    CipherType.Shift
  );
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [rawOutput, setRawOutput] = useState("");
  const [outputFormat, setOutputFormat] = useState("grouped");
  const [lastOperation, setLastOperation] = useState<
    "encrypt" | "decrypt" | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEncryptText = () => {
    const encryptFn = ciphers[selectedCipher].encrypt;
    setRawOutput(encryptFn(inputText, key));
    setLastOperation("encrypt");
  };

  const handleDecryptText = () => {
    const decryptFn = ciphers[selectedCipher].decrypt;
    setRawOutput(decryptFn(inputText, key));
    setLastOperation("decrypt");
  };

  const formattedOutput = useMemo(() => {
    if (!rawOutput) {
      return "";
    }

    const cleanText = rawOutput.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (outputFormat === "grouped") {
      return cleanText.match(/.{1,5}/g)?.join(" ") || "";
    }

    return cleanText;
  }, [rawOutput, outputFormat]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const triggerFileDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileEncrypt = async () => {
    if (!selectedFile || !key) {
      toast.error("Error", {
        description: "Please select a file and enter a key.",
      });
      return;
    }
    setIsProcessing(true);
    try {
      const encryptedBlob = await encryptFile(selectedFile, key);
      triggerFileDownload(encryptedBlob, `${selectedFile.name}.enc`);
      toast.success("Success", {
        description: "File encrypted and download started.",
      });
    } catch (error) {
      toast.error("Encryption Failed", { description: String(error) });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileDecrypt = async () => {
    if (!selectedFile || !key) {
      toast.error("Error", {
        description: "Please select a file and enter a key.",
      });
      return;
    }
    setIsProcessing(true);
    try {
      const { blob, fileName } = await decryptFile(selectedFile, key);
      triggerFileDownload(blob, `decrypted-${fileName}`);
      toast.success("Success", {
        description: "File decrypted and download started.",
      });
    } catch (error) {
      toast.error("Decryption Failed", { description: String(error) });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Cryptography Toolkit</CardTitle>
        <CardDescription>
          Encrypt and decrypt messages or files using classical ciphers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cipher-select">Cipher Algorithm</Label>
              <Select
                onValueChange={(v) => setSelectedCipher(v as CipherType)}
                defaultValue={CipherType.Shift}
              >
                <SelectTrigger id="cipher-select">
                  <SelectValue placeholder="Select a cipher" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CIPHER_NAMES).map(([k, name]) => (
                    <SelectItem key={k} value={k}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="key-input">Key</Label>
              <Input
                id="key-input"
                placeholder={
                  KEY_PLACEHOLDERS[
                    selectedCipher as keyof typeof KEY_PLACEHOLDERS
                  ]
                }
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Encryption</TabsTrigger>
              <TabsTrigger value="file">File Encryption</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="input-text">
                    Input (Plaintext / Ciphertext)
                  </Label>
                  <Textarea
                    id="input-text"
                    placeholder="Type your message here..."
                    className="min-h-[120px]"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleEncryptText}>Encrypt</Button>
                  <Button onClick={handleDecryptText} variant="outline">
                    Decrypt
                  </Button>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="output-text">Output</Label>
                    {/* Perubahan Logika #2: Tampilkan jika ada operasi (bukan hanya encrypt) */}
                    {lastOperation !== null && (
                      <RadioGroup
                        defaultValue="grouped"
                        onValueChange={setOutputFormat}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="raw" id="r-raw" />
                          <Label htmlFor="r-raw" className="font-normal">
                            Tanpa Spasi
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="grouped" id="r-grouped" />
                          <Label htmlFor="r-grouped" className="font-normal">
                            Kelompok 5-Huruf
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  </div>
                  <Textarea
                    id="output-text"
                    placeholder="Result will appear here..."
                    className="min-h-[120px] bg-muted font-mono"
                    value={formattedOutput}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="file" className="mt-4">
              <div className="grid gap-4">
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
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
