import React from "react";

const OpcionesWeb = ({ active }) => {
  return (
    <>
      <section
        className={`sm:w-9/12 w-11/12 margin flex justify-center flex-wrap transition-all ${
          active ? "-translate-y-8" : ""
        }`}
      >
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-solid fa-chart-simple w-8 h-8 text-3xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Real-time Chat Graphing
          </p>
        </figure>
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-regular fa-file w-8 h-8 text-3xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Processing Multiple Chats
          </p>
        </figure>
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-solid fa-file-signature w-8 h-8 text-3xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Content Analysis
          </p>
        </figure>
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-solid fa-chart-pie w-8 h-8 text-3xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Multiple Graphs
          </p>
        </figure>
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-regular fa-message w-8 h-8 text-3xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Message Segmentation
          </p>
        </figure>
        <figure className=" m-1 sm:w-8/12 w-10/12 flex justify-center font-bold items-center h-14 rounded-lg label_file hover:outline-indigo-600 hover:outline-1 hover:outline hover:text-indigo-600 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <i className="fa-solid fa-code w-8 h-8 text-2xl m-1"></i>
          <p className="text-slate-600 hover:text-indigo-600 text-center tracking-wider text-sm">
          Code Extraction
          </p>
        </figure>
      </section>
    </>
  );
};

export default OpcionesWeb;
