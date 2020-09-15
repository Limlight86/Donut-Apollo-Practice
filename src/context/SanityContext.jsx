import React, { createContext } from "react";
import { useQuery } from "@apollo/client";
import { DONUTS_QUERY } from "../data/Sanity";

const SanityContext = createContext();

const SanityContextProvider = ({ children }) => {
  const donutData = useQuery(DONUTS_QUERY);
  const altImage =
    "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112015/2015_tims_logo_coated_cmyk_1_colour_red.png?itok=wQ7l3H1l";

  return (
    <SanityContext.Provider value={{ donutData, altImage }}>
      {children}
    </SanityContext.Provider>
  );
};

export { SanityContext, SanityContextProvider };
