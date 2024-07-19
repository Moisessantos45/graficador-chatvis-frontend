const DashboardItem = ({ path, dataLength }) => {
  return (
    <div className="bg-transparent p-4 md:p-6 rounded-lg mb-4 md:mb-8 border border-solid border-[#232b48] mx-auto">
      <h2 className="text-lg md:text-xl mb-2 flex flex-wrap items-center">
        <span className="mr-2 mb-2">Total messages sent</span>
        <span className="text-xl md:text-2xl font-semibold text-[#f1c40f] bg-[#2c3e50] rounded-lg px-2 py-1 text-center mb-2">
          {path.replace(/.json/g, " ")}
        </span>
      </h2>
      <div className="text-3xl md:text-4xl font-bold">{dataLength}</div>
    </div>
  );
};

export default DashboardItem;
