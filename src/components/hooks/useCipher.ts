import { useState, useMemo } from "react";
import { toast } from "sonner";
import { CipherType } from "../../lib/types";
import * as ciphers from "../../lib/ciphers";
import { encryptFile, decryptFile } from "../../lib/fileProcessor";
import { triggerFileDownload } from "../../lib/utils";

const KEY_PLACEHOLDERS = {
  [CipherType.Shift]: "e.g., 3",
  [CipherType.Substitution]: "e.g., ZYXWVUTSRQPONMLKJIHGFEDCBA",
  [CipherType.Affine]: "e.g., 5,8",
  [CipherType.Vigenere]: "e.g., SECRET",
  [CipherType.Hill]: "e.g., 9,4,5,7",
  [CipherType.Permutation]: "e.g., 3,1,4,2",
  [CipherType.OneTimePad]: "Upload file kunci",
};

export const useCipher = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [selectedCipher, setSelectedCipher] = useState<CipherType>(
    CipherType.Shift
  );
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [keyFileContent, setKeyFileContent] = useState("");
  const [rawOutput, setRawOutput] = useState("");
  const [outputFormat, setOutputFormat] = useState("grouped");
  const [lastOperation, setLastOperation] = useState<
    "encrypt" | "decrypt" | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getCurrentKey = () => {
    return selectedCipher === CipherType.OneTimePad ? keyFileContent : key;
  };

  const handleEncryptClick = () => {
    const currentKey = getCurrentKey();
    if (!currentKey) {
      toast.error("Error", {
        description:
          selectedCipher === CipherType.OneTimePad
            ? "Silakan unggah file kunci."
            : "Kunci tidak boleh kosong.",
      });
      return;
    }
    const encryptFn = ciphers[selectedCipher].encrypt;
    setRawOutput(encryptFn(inputText, currentKey));
    setLastOperation("encrypt");
  };

  const handleDecryptClick = () => {
    const currentKey = getCurrentKey();
    if (!currentKey) {
      toast.error("Error", {
        description:
          selectedCipher === CipherType.OneTimePad
            ? "Silakan unggah file kunci."
            : "Kunci tidak boleh kosong.",
      });
      return;
    }
    const textToDecrypt = rawOutput;
    setInputText(textToDecrypt);
    const decryptFn = ciphers[selectedCipher].decrypt;
    const result = decryptFn(textToDecrypt, currentKey);
    setRawOutput(result);
    setLastOperation("decrypt");
  };

  const handleKeyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setKeyFileContent(text);
      toast.success(`File kunci "${file.name}" berhasil dimuat.`);
    };
    reader.onerror = () =>
      toast.error(`Gagal membaca file kunci "${file.name}".`);
    reader.readAsText(file);
  };

  const formattedOutput = useMemo(() => {
    if (!rawOutput) return "";
    if (lastOperation === "decrypt") return rawOutput;
    const cleanText = rawOutput.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (outputFormat === "grouped") {
      return cleanText.match(/.{1,5}/g)?.join(" ") || "";
    }
    return cleanText;
  }, [rawOutput, outputFormat, lastOperation]);

  const handleDownloadTextOutput = () => {
    if (!rawOutput) {
      toast.info("Tidak ada output untuk diunduh.");
      return;
    }
    const fileName =
      lastOperation === "encrypt" ? "ciphertext.txt" : "decrypted.txt";
    const blob = new Blob([formattedOutput], {
      type: "text/plain;charset=utf-8",
    });
    triggerFileDownload(blob, fileName);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
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
      triggerFileDownload(encryptedBlob, `${selectedFile.name}`);
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

  return {
    activeTab,
    setActiveTab,
    selectedCipher,
    setSelectedCipher,
    inputText,
    setInputText,
    key,
    setKey,
    keyFileContent,
    rawOutput,
    formattedOutput,
    outputFormat,
    setOutputFormat,
    lastOperation,
    selectedFile,
    isProcessing,
    KEY_PLACEHOLDERS,
    handleKeyFileChange,
    handleEncryptClick,
    handleDecryptClick,
    handleDownloadTextOutput,
    handleFileChange,
    handleFileEncrypt,
    handleFileDecrypt,
  };
};
