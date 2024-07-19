import React from "react";

const OpcionesWeb = ({ active }) => {
  return (
    <>
      <section
        className={`sm:w-9/12 w-11/12 margin flex justify-center flex-wrap transition-all ${
          active ? "-translate-y-8" : ""
        }`}
      >
        <div
          className="relative flex size-full min-h-screen flex-col bg-[#111422] dark group/design-root overflow-x-hidden"
          style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
        >
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex gap-6 justify-between">
                    <p className="text-white text-base font-medium leading-normal">
                      Step 2/8
                    </p>
                  </div>
                  <div className="rounded bg-[#323d67]">
                    <div
                      className="h-2 rounded bg-[#335cf0]"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
                  Upload your chat history
                </h1>
                <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                  Upload a WhatsApp chat history file (.txt) and well help you
                  analyze it
                </p>
                <div className="flex px-4 py-3 justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#232b48] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Upload</span>
                  </button>
                </div>
                <div className="flex px-4 py-3 justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Start Processing</span>
                  </button>
                </div>
                <p className="text-[#919dca] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                  or drag your file here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpcionesWeb;
