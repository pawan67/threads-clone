import { FC } from "react";
import Logo from "../logo/Logo";

interface SorryPageNotFoundProps {}

const SorryPageNotFound: FC<SorryPageNotFoundProps> = ({}) => {
  return (
    <div className=" flex flex-col space-y-3 items-center justify-center">
      <Logo />
      <h1 className=" text-center  text-lg font-semibold">
        Sorry, this page isn't available
      </h1>
      <p className=" text-center text-muted-foreground">
        The link you followed may be broken, or the page may have been removed
      </p>
    </div>
  );
};

export default SorryPageNotFound;
