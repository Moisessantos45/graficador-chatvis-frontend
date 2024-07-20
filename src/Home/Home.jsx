import { v4 as uuidv4 } from "uuid";
import useStoreApi from "../Store/useApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setOptionService } = useStoreApi();

  const navigate = useNavigate();

  const handleOptionService = (option) => {
    setOptionService(option);
    const id = uuidv4();
    navigate(`/upload/${id}?processing_option=${encodeURIComponent(option)}`);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111422] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/stability/916ae610-184d-4b63-84a9-d49b9536c9f5.png")',
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Understand your WhatsApp messages with Chatlytics
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Use Chatlytics to understand your WhatsApp messages,
                      including message volume, response time, and more. 100%
                      privacy, we never store any of your messages.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#111422] text-white">
              <h3 className="text-xl font-bold leading-tight tracking-wide px-6 py-4 border-b border-gray-700">
                Information Processing Options on Your Website
              </h3>
              <div className="flex flex-col sm:flex-row justify-start items-stretch p-6 gap-4">
                <button
                  className="flex-1 min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-xl py-3 px-6 bg-[#335cf0] hover:bg-[#4b6ef2] transition-colors duration-200 text-white text-sm font-semibold leading-normal tracking-wide"
                  onClick={() => handleOptionService("browser")}
                >
                  <span className="truncate">Process in the Browser</span>
                </button>
                <button
                  className="flex-1 min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-xl py-3 px-6 bg-[#232b48] hover:bg-[#2d3760] transition-colors duration-200 text-white text-sm font-semibold leading-normal tracking-wide"
                  onClick={() => handleOptionService("api")}
                >
                  <span className="truncate">Process via API</span>
                </button>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Real-time chat simulation
            </h2>
            <div className="flex items-end gap-3 p-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/50c161fa-c5e9-41c2-b5e6-2d9462fa4073.png")',
                }}
              />
              <div className="flex flex-1 flex-col gap-1 items-start">
                <p className="text-[#919dca] text-[13px] font-normal leading-normal max-w-[360px]">
                  Human
                </p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#232b48] text-white">
                  Hey! I just got back from the gym and Im about to make some
                  dinner.
                </p>
              </div>
            </div>
            <div className="flex items-end gap-3 p-4 justify-end">
              <div className="flex flex-1 flex-col gap-1 items-end">
                <p className="text-[#919dca] text-[13px] font-normal leading-normal max-w-[360px] text-right">
                  Chatlytics
                </p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#335cf0] text-white">
                  Sounds like a great day! What are you planning to make?
                </p>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/f3f77157-4231-4c71-8d40-cdbb3c6dba8a.png")',
                }}
              />
            </div>
            <div className="flex items-end gap-3 p-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/6e1c5755-83c5-48ab-98b2-d34f7b0d1bca.png")',
                }}
              />
              <div className="flex flex-1 flex-col gap-1 items-start">
                <p className="text-[#919dca] text-[13px] font-normal leading-normal max-w-[360px]">
                  Human
                </p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#232b48] text-white">
                  Im thinking chicken and veggies. Pretty simple, but Im trying
                  to eat healthier.
                </p>
              </div>
            </div>
            <div className="flex items-end gap-3 p-4 justify-end">
              <div className="flex flex-1 flex-col gap-1 items-end">
                <p className="text-[#919dca] text-[13px] font-normal leading-normal max-w-[360px] text-right">
                  Chatlytics
                </p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#335cf0] text-white">
                  Thats a great choice. If you need any cooking tips, Im here to
                  help!
                </p>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/017182b8-dea7-4b68-83a3-5c248e411a30.png")',
                }}
              />
            </div>
            <div className="flex items-center px-4 py-3 gap-3 @container">
              <label className="flex flex-col min-w-40 h-12 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <input
                    placeholder="Write a message..."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#232b48] focus:border-none h-full placeholder:text-[#919dca] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    defaultValue=""
                  />
                  <div className="flex border-none bg-[#232b48] items-center justify-center pr-4 rounded-r-xl border-l-0">
                    <div className="flex items-center gap-4 justify-end">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center p-1.5">
                          <div
                            className="text-[#919dca]"
                            data-icon="Paperclip"
                            data-size="20px"
                            data-weight="regular"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20px"
                              height="20px"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                      <button className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#335cf0] text-white text-sm font-medium leading-normal hidden @[480px]:block">
                        <span className="truncate">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#323d67] p-6">
                <p className="text-white text-base font-medium leading-normal">
                  Message Volume Over Time
                </p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                  5000
                </p>
                <p className="text-[#919dca] text-base font-normal leading-normal">
                  Last 30 days
                </p>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "10%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 1
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "80%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 2
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "40%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 3
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "80%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 4
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "30%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 5
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "70%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 6
                  </p>
                  <div
                    className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                    style={{ height: "60%" }}
                  />
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Day 7
                  </p>
                </div>
              </div>
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#323d67] p-6">
                <p className="text-white text-base font-medium leading-normal">
                  Response Time Distribution
                </p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                  120
                </p>
                <p className="text-[#919dca] text-base font-normal leading-normal">
                  Last 30 days
                </p>
                <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    &lt;1h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    1-2h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    2-3h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "90%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    3-4h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "30%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    4-5h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "90%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    5-6h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                  <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    &gt;6h
                  </p>
                  <div className="h-full flex-1">
                    <div
                      className="border-[#919dca] bg-[#232b48] border-r-2 h-full"
                      style={{ width: "10%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#323d67] p-6">
                <p className="text-white text-base font-medium leading-normal">
                  Message Flow Between Users
                </p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                  5000
                </p>
                <p className="text-[#919dca] text-base font-normal leading-normal">
                  Last 30 days
                </p>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg
                    width="100%"
                    height={148}
                    viewBox="-3 0 478 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_1131_5935)"
                    />
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#919dca"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1131_5935"
                        x1={236}
                        y1={1}
                        x2={236}
                        y2={149}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#232b48" />
                        <stop offset={1} stopColor="#232b48" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                      User 1
                    </p>
                    <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                      User 2
                    </p>
                    <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                      User 3
                    </p>
                    <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                      User 4
                    </p>
                    <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
                      User 5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
