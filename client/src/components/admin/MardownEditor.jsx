/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";

const MarkdownEditor = ({
  label,
  value,
  handleChange,
  name,
  isOpenMD,
  setIsOpenMD,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <span className="font-semibold">{label}:</span>
        <button
          className="px-1 bg-orange-400 rounded-sm"
          onClick={() => setIsOpenMD(!isOpenMD)}
        >
          {isOpenMD ? "Close" : "Open"}
        </button>
      </div>
      {isOpenMD && (
        <Editor
          apiKey={import.meta.env.VITE_MCETINY}
          initialValue={value}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onChange={(e) =>
            handleChange((prev) => ({ ...prev, [name]: e.target.getContent() }))
          }
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
