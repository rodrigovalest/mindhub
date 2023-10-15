import { ReactNode } from "react";

interface IPropsContainer {
  children: ReactNode
}

const Container = ({ children }: IPropsContainer) => {
  return (
    <section className="flex justify-center">
      <div className={`mb-10 mt-[70px] w-5/6 md:w-2/3`}>
        {children}
      </div>
    </section>
  );
}

export default Container;
