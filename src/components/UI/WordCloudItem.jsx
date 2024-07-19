const WordCloudItem = ({ word, percentage }) => (
  <div className="flex items-center space-x-2">
    <span className="min-w-[100px] text-right">{word}</span>
    <div className="flex-grow bg-gray-800 rounded-lg overflow-hidden">
      <div
        className="bg-gray-600 h-4 rounded-lg"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="min-w-[40px] text-left">{percentage}%</span>
  </div>
);

export default WordCloudItem;