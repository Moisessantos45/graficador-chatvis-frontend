import React from "react";

const VisualizationMenu = () => {
  return (
    <section className="w-full max-w-screen-lg mx-auto p-4 sm:w-9/12">
      <div className="relative flex size-full min-h-screen flex-col bg-[#111422] dark group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-md p-6">
              <h2 className="text-white tracking-light text-2xl font-bold leading-tight text-center pb-3">
                What would you like to do next?
              </h2>
              <div className="flex flex-col gap-4 py-3">
                <button
                  className="flex justify-center items-center rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal"
                  //   onClick={showBarChart}
                >
                  View Bar Chart
                </button>
                <button
                  className="flex justify-center items-center rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal"
                  //   onClick={showChordDiagram}
                >
                  View Chord Diagram
                </button>
                <button
                  className="flex justify-center items-center rounded-xl h-10 px-4 bg-[#335cf0] text-white text-sm font-bold leading-normal"
                  //   onClick={simulateChat}
                >
                  Simulate Chat in Real-Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationMenu;
