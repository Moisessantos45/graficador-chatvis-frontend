import { useState } from "react";
import useStoreApi from "../Store/useApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showToastNotification } from "../utils/showToastNotification";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProcesesFiles = () => {
  const { progressBar, setIsLoad, uploadFiles } = useStoreApi();
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const query = useQuery();
  const option = query.get("processing_option");

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length <= 0) {
      showToastNotification("Please select a file", false);
      return;
    }

    uploadFiles(files, option, id);

    const queryParam = files[0].name
      .replace("Chat de WhatsApp con ", "")
      .replace(/\.txt$/, "");
    navigate(
      `/action-panel/${id}?service=home&file=${encodeURIComponent(
        queryParam
      )}&processing_option=${encodeURIComponent(option)}`
    );
    setIsLoad(true);
  };

  return (
    <>
      <section className="w-full max-w-screen-lg mx-auto p-4 sm:w-9/12">
        <div
          className="relative flex size-full flex-col bg-[#111422] dark group/design-root overflow-x-hidden"
          style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
          <div className="layout-container flex sm:h-[80vh] grow flex-col">
            <div className="flex flex-1 justify-center py-5">
              <form
                className="layout-content-container flex flex-col w-full max-w-md p-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 justify-between">
                    <p className="text-white text-base font-medium leading-normal">
                      Step {files.length}
                    </p>
                  </div>
                  <div className="rounded bg-[#323d67]">
                    <div
                      className="h-2 rounded bg-[#335cf0]"
                      style={{ width: `${progressBar}%` }}
                    />
                  </div>
                </div>
                <h1 className="text-white tracking-light text-2xl font-bold leading-tight text-center pb-3 pt-6">
                  Upload your chat history
                </h1>
                <p className="text-white text-base font-normal leading-normal pb-3 pt-1 text-center">
                  Upload a WhatsApp chat history file (.txt) and well help you
                  analyze it
                </p>
                <div className="flex justify-center py-3">
                  <label htmlFor="file">
                    <div className="flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                      <span className="truncate">Upload</span>
                    </div>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    accept=".txt"
                    id="file"
                    multiple
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center py-3">
                  <button
                    className="flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                    type="submit"
                  >
                    <span className="truncate">Start Processing</span>
                  </button>
                </div>
                <p className="text-[#919dca] text-sm font-normal leading-normal pb-3 pt-1 text-center">
                  or drag your file here
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcesesFiles;
