import bg_chart_js from "../img/chart-js.png";
import bg_victory from "../img/victory-icon.png";
import bg_icon_fontsome from "../img/font_awesome_logo.png";
import bg_icon_miui from "../img/logo_MUI.png";

const About = () => {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-[#111422] dark">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl xl:text-5xl">
              Frameworks and Libraries Used
            </h2>
            <p className="mt-4 text-base text-gray-300 sm:mt-8">
              Information on the use
            </p>
          </div>
          <div className="sm:col-gap-6 row-gap-6 md:ga mt-10 grid grid-cols-1 sm:mt-16 sm:grid-cols-3 md:grid-cols-3 xl:mt-24">
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon m-auto icon-tabler icon-tabler-brand-react "
                width={56}
                height={56}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
                <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
                <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
                <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
                <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
                <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
                <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
              </svg>

              <h3 className="mt-12 text-xl font-bold text-slate-100">React</h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to create the website and render the data.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon m-auto icon-tabler icon-tabler-brand-tailwind"
                width={56}
                height={56}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" />
              </svg>

              <h3 className="mt-12 text-xl font-bold text-slate-100">
                Tailwindcss
              </h3>
              <p className="mt-5 text-base text-gray-100">
                It was used to style the components and HTML elements.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon m-auto icon-tabler icon-tabler-brand-nodejs"
                width={56}
                height={56}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" />
                <path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" />
              </svg>

              <h3 className="mt-12 text-xl font-bold text-slate-100">
                Node Js
              </h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to implement an AI, with the purpose of extracting
                the main idea from the group.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon m-auto icon-tabler icon-tabler-brand-d3"
                width={56}
                height={56}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 4h1.8c3.976 0 7.2 3.582 7.2 8s-3.224 8 -7.2 8h-1.8" />
                <path d="M12 4h5.472c1.948 0 3.528 1.79 3.528 4s-1.58 4 -3.528 4" />
                <path d="M17.472 12h-2.472" />
                <path d="M17.472 12h-2.352" />
                <path d="M17.472 12c1.948 0 3.528 1.79 3.528 4s-1.58 4 -3.528 4h-5.472" />
              </svg>

              <h3 className="mt-12 text-xl font-bold text-slate-100">D3Js</h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to create the chord chart and display the
                connections between the members.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <img
                src={bg_chart_js}
                alt=""
                className=" w-14 h-14 m-auto flex"
              />
              <h3 className="mt-12 text-xl font-bold text-slate-100">
                Chart Js
              </h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to plot the data, bar charts for day, date, and
                time.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <img src={bg_victory} alt="" className=" flex m-auto w-14 h-14" />
              <h3 className="mt-12 text-xl font-bold text-slate-300">
                Victory Native
              </h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to plot the data on whether there was code in the
                messages.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <img
                src={bg_icon_miui}
                alt=""
                className=" flex w-14 h-14 m-auto"
              />
              <h3 className="mt-12 text-xl font-bold text-slate-100">
                Mui/Material
              </h3>
              <p className="mt-5 text-base text-gray-200">
                It was used to create the tooltip and some designs for React
                components.
              </p>
            </div>
            <div className="md:border-b-2 border-sky-500 md:shadow-lg m-2 md:p-8 lg:p-12">
              <img
                src={bg_icon_fontsome}
                alt="imagen de fontawesome"
                className=" flex w-14 h-14 m-auto"
              />
              <h3 className="mt-12 text-xl font-bold text-slate-100">
                Fontawesome
              </h3>
              <p className="mt-5 text-base text-gray-300">
                It was used to get the icons for the elements and buttons on the
                website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto my-10 flex max-w-xl flex-col rounded-3xl border-blue-300 px-4 py-10 text-gray-700 sm:border-8 sm:px-10 lg:max-w-screen-lg lg:flex-row bg-[#111422] dark">
        <div className="mr-2">
          <h2 className="mb-4 text-4xl font-medium  text-gray-300">
            Development <span className="text-blue-600">Information</span>
          </h2>
          <p className="mb-6  text-gray-300">Project developers data</p>
          <div className="mb-4 space-y-4">
            <div className="flex space-x-2">
              <span className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                  />
                </svg>
              </span>
              <span className="font-medium text-slate-100">
                Moises Santos Hernandez
              </span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                  />
                </svg>
              </span>
              <span className="font-medium text-slate-100">
                Student: Faculty of Intelligent Systems Engineering
              </span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                  />
                </svg>
              </span>
              <span className="font-medium text-slate-100">
                Subject: Software Engineering
              </span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                  />
                </svg>
              </span>
              <span className="font-medium text-slate-100">
                University: Autonomous University Of San Luis Potosí
              </span>
            </div>
          </div>
        </div>
        <div className="h-96">
          <img
            className="h-full w-full object-contain"
            src="https://i.ibb.co/qpGn19j/foto-proyecto.png"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default About;
