import { Typography } from "@mui/material";

interface FileDisplayProps {
  fileBuffer: { data: number[] };
  fileName: string;
  fileType?: string;
}

const FileDisplay = ({
  fileBuffer,
  fileName,
  fileType = "pdf"
}: FileDisplayProps) => {
  const fileData = new Uint8Array(fileBuffer.data);
  const fileBlob = new Blob([fileData], { type: "application/octet-stream" });
  const fileUrl = URL.createObjectURL(fileBlob);

  return (
    <div>
      <Typography
        variant="subtitle2"
        component="a"
        href={fileUrl}
        download={`${fileName}${fileType}`}
      >
        {`${fileName}${fileType}`}
      </Typography>
    </div>
  );
};

export default FileDisplay;
