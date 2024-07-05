import logoU from "../ubelle.png";
export const Header = () => {
  return (
    <header className="App-header p-16">
      <h1 className="font-bold text-blue-700 text-2xl text-center">
        <a href="/">
          {" "}
          <img alt="" src={logoU} width={100} className="inline mr-8" />
        </a>
        <a
          href="https://www.ubellenigeria.com/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-900"
        >
          Ubelle Nigeria Limited
        </a>{" "}
        |{" "}
        <a
          href="https://techneo.ng/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-900"
        >
          Neo Cloud Technologies
        </a>
      </h1>
    </header>
  );
};
